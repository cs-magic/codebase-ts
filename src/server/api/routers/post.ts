import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"
import { db } from "@/server/db"
import { $Enums } from "@prisma/client"
import { createMessageSchema } from "@/schema/message"

import ConversationType = $Enums.ConversationType
import { pusherSend } from "@/puser/utils"

export const messageRouter = createTRPCRouter({
  add: protectedProcedure
    .input(createMessageSchema)
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user
      const { text, id: conversationId = "" } = input
      const message = await db.message.create({
        data: {
          fromUser: {
            connect: {
              id: userId,
            },
          },
          content: text,
          toConversation: {
            connectOrCreate: {
              where: { id: conversationId },
              create: {
                type: ConversationType.LLM,
                users: {
                  connect: [{ id: userId }],
                },
              },
            },
          },
        },
      })

      const channelId = message.toConversationId
      void pusherSend(channelId, "onUserMessage", {
        channelId,
        content: text,
        fromUserId: userId,
      })

      return message
    }),
})
