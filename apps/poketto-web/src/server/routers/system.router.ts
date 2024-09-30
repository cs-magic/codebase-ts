import { FREE_GPT3_DAILY_TOTAL, FREE_GPT4_DAILY_TOTAL } from "@/config"
import { createTRPCRouter, publicProcedure } from "@/server/trpc-helpers"

const status = {
  gpt3: {
    free: {
      surplus: FREE_GPT3_DAILY_TOTAL,
    },
  },
  gpt4: {
    free: {
      surplus: FREE_GPT4_DAILY_TOTAL,
    },
  },
}

export const systemRouter = createTRPCRouter({
  status: publicProcedure.query(async ({ ctx: { prisma } }) => {
    const apps = await prisma.pokettoApp.count()
    const users = await prisma.user.count()
    const calls = await prisma.chatMessage.count()
    const feedbacks = await prisma.feedback.count()
    return {
      ...status,
      apps,
      users,
      calls: (calls / 2) * 26 + 1,
      feedbacks,
    }
  }),
})
