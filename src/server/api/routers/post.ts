import { z } from "zod"

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc"
import { db } from "@/server/db"
import { observable } from "@trpc/server/observable"
import { Post } from ".prisma/client"
import EventEmitter from "events"

class MyEventEmitter extends EventEmitter {}

const ee = new MyEventEmitter()

export const postRouter = createTRPCRouter({
  add: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        text: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { name } = ctx.user
      const post = await db.post.create({
        data: {
          ...input,
          name,
        },
      })

      ee.emit("add", post)
      return post
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
