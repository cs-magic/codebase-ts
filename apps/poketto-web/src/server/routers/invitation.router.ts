import { createTRPCRouter, protectedProcedure } from "@/server/trpc-helpers"

export const invitationRouter = createTRPCRouter({
  list: protectedProcedure.query(
    async ({
      ctx: {
        prisma,
        session: { user },
      },
    }) => prisma.invitationRelation.findMany({ where: { fromId: user.id } }),
  ),
})
