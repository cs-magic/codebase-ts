import { ChatMessageFormatType, Prisma } from "@prisma/client";
import { z } from "zod";

import {
  includeConvForDetailView,
  selectAppForDetailView,
  selectConvForListView,
} from "@/ds";
import { getWelcomeSystemNotification } from "@/lib/string";
import { ConversationWhereUniqueInputSchema } from "@/prisma/generated/zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/trpc-helpers";

export const convRouter = createTRPCRouter({
  /**
   * todo: public with permission control
   */
  has: protectedProcedure.input(ConversationWhereUniqueInputSchema).query(
    async ({
      input,
      ctx: {
        prisma,
        session: { user },
      },
    }) => !!(await prisma.conversation.findUnique({ where: input })),
  ),

  add: protectedProcedure
    .input(
      z.object({
        appId: z.string(),
      }),
    )
    .mutation(
      async ({
        ctx: {
          prisma,
          session: { user },
        },
        input: { appId },
      }) => {
        // console.log("adding app: ", { userId, appId })
        const app = await prisma.pokettoApp.findUniqueOrThrow({
          where: { id: appId },
          select: selectAppForDetailView,
        });
        const addedConv = await prisma.conversation.create({
          include: {
            messages: true,
          },
          data: {
            user: {
              connect: {
                id: user.id,
              },
            },
            app: {
              connect: {
                id: app.id,
              },
            },
            messages: {
              create: [
                {
                  role: "system",
                  content: getWelcomeSystemNotification(user.name ?? "bro"), // do not know app name here, lol
                  format: ChatMessageFormatType.systemNotification,
                },
                ...app.prompts,
              ],
            },
          },
        });
        console.log(`added conv(id=${addedConv.id})`);
        return addedConv;
      },
    ),

  list: protectedProcedure.query(
    async ({
      ctx: {
        prisma,
        session: { user },
      },
      input,
    }) =>
      prisma.conversation.findMany({
        select: selectConvForListView,
        where: { userId: user.id },
      }),
  ),

  getForChat: publicProcedure
    .input(ConversationWhereUniqueInputSchema)
    .query(async ({ ctx: { prisma }, input }) =>
      prisma.conversation.findUniqueOrThrow({
        where: input,
        select: {
          user: true,
          app: {
            select: {
              prompts: {
                take: 1,
                select: {
                  content: true,
                  role: true,
                },
              },
            },
          },
        },
      }),
    ),

  get: protectedProcedure.input(ConversationWhereUniqueInputSchema).query(
    async ({
      ctx: {
        prisma,
        session: { user },
      },
      input,
    }) =>
      prisma.conversation.findUnique({
        include: includeConvForDetailView,
        where: input,
      }),
  ),

  pin: protectedProcedure
    .input(
      z.object({
        conversationId: z.string(),
        toStatus: z.boolean(),
      }),
    )
    .mutation(
      async ({
        ctx: {
          prisma,
          session: { user },
        },
        input: { conversationId, toStatus },
      }) => {
        await prisma.conversation.update({
          where: { id: conversationId },
          data: { pinned: toStatus },
        });
      },
    ),

  del: protectedProcedure.input(ConversationWhereUniqueInputSchema).mutation(
    async ({
      ctx: {
        prisma,
        session: { user },
      },
      input,
    }) =>
      //   todo: validate in zod
      prisma.conversation.delete({ where: input }),
  ),
});
