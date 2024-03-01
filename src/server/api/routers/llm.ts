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

  getPApp: publicProcedure.input(z.string()).query(async ({ input }) => {
    return db.pApp.findUniqueOrThrow({ where: { id: input }, ...pAppSchema })
  }),

  listConversations: protectedProcedure.query(async () => {
    return db.conversation.findMany({
      ...conversationSchema,
      orderBy: { updatedAt: "desc" },
    })
  }),

  getConversations: protectedProcedure
    .input(z.object({ conversationId: z.string() }))
    .query(async ({ input }) => {
      return db.conversation.findUniqueOrThrow({
        where: { id: input.conversationId },
        ...conversationSchema,
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
            connect: input.pAppIds.map((p) => ({
              id: p,
            })),
          },
        },
        ...conversationSchema,
      })
      console.log({ conversation })
      return conversation
    }),
})
