import { Prisma } from "@prisma/client";
import { PokettoAppWhereUniqueInputSchema } from "@/../../prisma/generated/zod";
import { z } from "zod";

import { DEFAULT_BATCH_CARDS, TAG_SEPARATOR } from "@/config";
import type { SortOrder } from "@/ds";
import { selectAppForDetailView, selectAppForListView, sortOrders } from "@/ds";
import { createTRPCRouter, publicProcedure } from "@/server/trpc-helpers";

const orderByMap: {
  [key in SortOrder]: Prisma.PokettoAppOrderByWithRelationInput;
} = {
  mostViewed: { state: { views: "desc" } },
  mostUsed: { state: { calls: "desc" } },
  // mostSaved: { state: { stars: "desc" } },
  // mostShared: { state: { shares: "desc" } },
  newest: { state: { id: "desc" } },
  // top: { state: { calls: "desc" } },
  // trending: { state: { shares: "desc" } },
  // recommend
};

export const pokettoAppRouter = createTRPCRouter({
  /**
   * todo: public with permission control
   */

  list: publicProcedure
    .input(
      z.object({
        cursor: z.string().nullish(), // offset pagination; todo: cursor pagination (when database is bigger)
        limit: z.number().default(DEFAULT_BATCH_CARDS),

        language: z.string().optional(),
        categoryMain: z.number().optional(),
        categorySub: z.number().optional(),
        tags: z.string().optional(), // use | to space
        searchKey: z.string().optional(),
        // todo: array augment
        sortOrder: z.enum(sortOrders).default("mostUsed"),
      }),
    )
    .query(
      async ({
        ctx: { prisma },
        input: {
          cursor,
          language,
          searchKey,
          limit,
          sortOrder,
          categoryMain,
          categorySub,
          tags,
        },
      }) => {
        const items = await prisma.pokettoApp.findMany({
          cursor: cursor ? { id: cursor } : undefined,
          take: limit + 1,

          select: selectAppForListView,
          where: {
            language,
            categoryMain,
            categorySub,
            tags: {
              every: {
                id: {
                  in: tags?.split(TAG_SEPARATOR),
                },
              },
            },
            OR: [
              { name: { contains: searchKey } },
              { desc: { contains: searchKey } },
              { creator: { name: { contains: searchKey } } },
            ],
          },
          orderBy: orderByMap[sortOrder],
        });
        let nextCursor: typeof cursor | undefined;
        if (items.length > limit) {
          const nextItem = items.pop();
          nextCursor = nextItem!.id;
        }
        return {
          items,
          nextCursor,
        };
      },
    ),

  get: publicProcedure
    .input(PokettoAppWhereUniqueInputSchema)
    .query(async ({ ctx: { prisma }, input }) => {
      return prisma.pokettoApp.findUniqueOrThrow({
        select: selectAppForDetailView,
        where: input,
      });
    }),
});
