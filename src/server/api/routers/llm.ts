import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc"
import { db } from "@/server/db"
import {
  conversationSchema,
  createConversationSchema,
  modelSchema,
  pAppSchema,
} from "@/schema/conversation"
import { z } from "zod"

export const llmRouter = createTRPCRouter({
  listModels: publicProcedure.query(async () => {
    return db.model.findMany({ ...modelSchema, orderBy: { updatedAt: "desc" } })
  }),

  listPApps: publicProcedure.query(async () => {
    return db.pApp.findMany({ ...pAppSchema, orderBy: { updatedAt: "desc" } })
  }),

  listConversations: protectedProcedure.query(async () => {
    return db.conversation.findMany({
      ...conversationSchema,
      orderBy: { updatedAt: "desc" },
    })
  }),

  delConversation: protectedProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      return db.conversation
        .delete({ where: { id: input } })
        .catch(console.error)
    }),

  createConversation: protectedProcedure
    .input(createConversationSchema)
    .mutation(async ({ input, ctx }) => {
      console.log({ input })
      const conversation = await db.conversation.create({
        data: {
          fromUserId: ctx.user.id,
          type: input.type,
          pApps: {
            connect: input.pApps.map((p) => ({
              id: p.id,
            })),
          },
        },
        ...conversationSchema,
      })
      console.log({ conversation })
      return conversation
    }),
})
