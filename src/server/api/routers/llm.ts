import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc"
import { db } from "@/server/db"
import {
  conversationModelSchema,
  conversationSchema,
  createConversationSchema,
  modelSchema,
} from "@/schema/conversation"

export const llmRouter = createTRPCRouter({
  listModels: publicProcedure.query(async () => {
    return db.model.findMany({ ...modelSchema })
  }),

  createConversation: protectedProcedure
    .input(createConversationSchema)
    .mutation(async ({ input, ctx }) => {
      const conversation = await db.conversation.create({
        data: {
          fromUserId: ctx.user.id,
          type: input.type,
          models: {
            createMany: {
              data: input.models,
            },
          },
        },
        ...conversationSchema,
      })
      console.log({ conversation })
      return conversation
    }),
})
