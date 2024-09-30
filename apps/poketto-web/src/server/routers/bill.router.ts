import { TRPCError } from "@trpc/server"
import { z } from "zod"

import { createTRPCRouter, protectedProcedure } from "@/server/trpc-helpers"

export const billRouter = createTRPCRouter({
  addCoupon: protectedProcedure
    .input(
      z.object({
        coupon: z.string(),
      }),
    )
    .mutation(
      async ({
        ctx: {
          prisma,
          session: { user },
        },
        input: { coupon },
      }) => {
        if (coupon !== "cp_cs-magic") {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "invalid coupon",
          })
        }
        return prisma.user.update({
          where: { id: user.id },
          data: {
            balance: {
              increment: 100,
            },
          },
        })
      },
    ),

  listPayments: protectedProcedure.query(
    ({
      ctx: {
        prisma,
        session: { user },
      },
    }) => prisma.stripePayment.findMany({ where: { userId: user.id } }),
  ),
})
