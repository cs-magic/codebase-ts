import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc"
import { db } from "@/server/db"
import { observable } from "@trpc/server/observable"
import { $Enums, Post } from "@prisma/client"
import EventEmitter from "events"
import { createMessageSchema } from "@/schema/message"
import ConversationType = $Enums.ConversationType

class MyEventEmitter extends EventEmitter {}

const ee = new MyEventEmitter()

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

      ee.emit("add", message)
      return message
    }),

  onAdd: publicProcedure.subscription(() => {
    return observable<Post>((emit) => {
      const onAdd = (data: Post) => {
        emit.next(data)
      }

      ee.on("add", onAdd)
      return () => {
        ee.off("add", onAdd)
      }
    })
  }),
})
