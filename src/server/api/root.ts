import { messageRouter } from "@/server/api/routers/post"
import { createTRPCRouter } from "@/server/api/trpc"
import { llmRouter } from "@/server/api/routers/llm"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  message: messageRouter,
  llm: llmRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
