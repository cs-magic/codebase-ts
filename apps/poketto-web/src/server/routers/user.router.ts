import { selectUserProfile } from "@/ds"
import { UserWhereUniqueInputSchema } from "@/prisma/generated/zod"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/trpc-helpers"

export const userRouter = createTRPCRouter({
  list: publicProcedure.query(({ ctx }) => ctx.prisma.user.findMany({ select: selectUserProfile })),

  getProfile: publicProcedure
    .input(UserWhereUniqueInputSchema)
    .query(async ({ ctx: { prisma }, input }) => prisma.user.findUnique({ where: input, select: selectUserProfile })),

  del: protectedProcedure.mutation(
    async ({
      ctx: {
        prisma,
        session: { user },
      },
    }) => {
      return prisma.user.delete({ where: { id: user.id } })
    },
  ),
})
