import d from "@cs-magic/common/datetime";
import { prisma } from "@cs-magic/common/db/prisma";
import { getServerId } from "@cs-magic/common/router";
import { subscriptionLevel2Unit } from "@cs-magic/common/stripe/config";
import { stripe } from "@cs-magic/common/stripe/server";
import { decodeClientReferenceId } from "@cs-magic/common/stripe/utils";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

/**
 * ref:
 * ❤️ https://makerkit.dev/blog/tutorials/nextjs13
 * NextRequest, ref: https://github.com/BastidaNicolas/nextauth-prisma-stripe/blob/master/src/app/api/webhooks/route.ts
 * ode:stream/consumers, ref: https://github.com/vercel/next.js/issues/49739#issuecomment-1553858264
 */
export async function POST(req: Request) {
  const body = await req.text(); // 直接获取 raw body，值得注意的是，webhook不能有相同的，会导致 signature 不匹配
  const signature = headers().get("Stripe-Signature")!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    // On error, log and return the error message.
    if (err! instanceof Error) console.log(err);
    console.log(`❌ Error message: ${errorMessage}`);
    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 },
    );
  }

  const {
    id,
    type,
    data: { object },
  } = event;
  // console.debug("event: ", JSON.stringify(event))
  console.log("stripe web hook event: ", { id, type });

  switch (type) {
    case "checkout.session.completed":
      const session = object as Stripe.Checkout.Session;
      const { mode, customer } = session;
      const { client_reference_id } = session;
      if (!client_reference_id)
        return NextResponse.json({
          message:
            "skip handling since  no client_reference_id in this webhook",
        });
      const { userId, serverId } = decodeClientReferenceId(client_reference_id);
      console.log({ client_reference_id: { serverId, userId } });

      if (serverId !== getServerId()) {
        return NextResponse.json({
          message: "skip handling since origin mismatch",
        });
      }

      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        console.error("既然有origin、userId，不应该没有user！", {
          serverId,
          userId,
        });
        return NextResponse.json({
          message:
            "no user of this webhook in database, maybe it's for another server so won't be handled then",
        });
      }

      const stripeCustomerId = customer as string;

      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id,
      );
      for (const item of lineItems.data) {
        const productId = item.price?.product as string; // get the product ID
        const productInfo = await prisma.stripeProduct.findUniqueOrThrow({
          where: { id: productId },
        });
        const { quantity } = item; // get the quantity
        const count = quantity ?? 1;

        console.log({ customer, mode, userId, productId, quantity });

        if (mode === "payment") {
          await prisma.user.update({
            where: { id: userId },
            include: {
              stripePayments: true,
            },
            data: {
              balance: {
                increment:
                  subscriptionLevel2Unit[productInfo.level ?? "basic"] *
                  count *
                  100,
              },
              stripeCustomerId,
              stripePayments: {
                create: {
                  id: session.id,
                  product: {
                    connect: {
                      id: productId,
                    },
                  },
                  count,
                },
              },
            },
          });
        }

        if (mode === "subscription") {
          await prisma.user.update({
            where: {
              id: userId,
            },
            data: {
              balance: {
                increment:
                  subscriptionLevel2Unit[productInfo.level ?? "basic"] *
                  count *
                  100,
              },
              stripeSubscriptionEnd: d(new Date()).add(30, "days").toDate(),
              stripeCustomerId,
              stripePayments: {
                create: {
                  id: session.id,
                  product: {
                    connect: {
                      id: productId,
                    },
                  },
                  count,
                },
              },
            },
          });
        }
      }
      break;
    default:
      break;
  }

  return NextResponse.json({ message: "✅" });
}
