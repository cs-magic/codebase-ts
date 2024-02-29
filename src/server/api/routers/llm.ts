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

export const llmRouter = createTRPCRouter({
  listModels: publicProcedure.query(async () => {
    return db.model.findMany({ ...modelSchema })
  }),

  listPApps: publicProcedure.query(async () => {
    return db.pApp.findMany({ ...pAppSchema })
  }),

  createConversation: protectedProcedure
    .input(createConversationSchema)
    .mutation(async ({ input, ctx }) => {
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
