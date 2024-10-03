import {
  defaultModelQuota,
  ModelType,
  selectChatMessageForDetailView,
} from "@/ds";
import {
  ChatMessageUncheckedCreateInputSchema,
  ChatMessageWhereInputSchema,
} from "@/prisma/generated/zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/trpc-helpers";
import { PrismaVectorStore } from "@langchain/community/vectorstores/prisma";
import { OpenAIEmbeddings } from "@langchain/openai";
import { type ChatMessage, Prisma } from "@prisma/client";
import { type CreateMessage } from "ai";
import sortBy from "lodash/sortBy";
import sortedUniqBy from "lodash/sortedUniqBy";
import { z } from "zod";

export const msgRouter = createTRPCRouter({
  // the action of pushing is at the backend
  push: publicProcedure
    .input(ChatMessageUncheckedCreateInputSchema)
    .mutation(async ({ ctx: { prisma }, input }) => {
      let {
        user: { id, balance, quota },
      } = await prisma.conversation.findUniqueOrThrow({
        where: { id: input.conversationId },
        select: {
          user: true,
        },
      });
      // possible null
      if (!quota) quota = defaultModelQuota;

      // todo: token calculation
      const ourToken = (input.content ?? "").length / 1000;
      const modelType = input.modelType as ModelType;
      if (input.role === "assistant") {
        if (balance > 0) {
          const cost = modelType === "gpt-4" ? 2 : 1;
          balance -= cost;
        } else {
          --quota[modelType];
        }
        await prisma.user.update({
          where: { id },
          data: {
            quota,
            balance,
          },
        });
      }

      const vectorStore = PrismaVectorStore.withModel<ChatMessage>(
        prisma,
      ).create(new OpenAIEmbeddings(), {
        prisma: Prisma,
        tableName: "ChatMessage",
        vectorColumnName: "vector",
        columns: {
          id: PrismaVectorStore.IdColumn,
          content: PrismaVectorStore.ContentColumn,
          role: PrismaVectorStore.ContentColumn,
        },
      });
      const model = await prisma.chatMessage.create({ data: input });
      await vectorStore.addModels([model]);
      return model;
    }),

  getContext: publicProcedure
    .input(
      z.object({
        conversationId: z.string(),
        content: z.string(),
        modelType: z.string(),
      }),
    )
    .query(
      async ({
        ctx: { prisma },
        input: { conversationId, content, modelType },
      }) => {
        const vectorStore = PrismaVectorStore.withModel<ChatMessage>(
          prisma,
        ).create(new OpenAIEmbeddings(), {
          prisma: Prisma,
          tableName: "ChatMessage",
          vectorColumnName: "vector",
          columns: {
            id: PrismaVectorStore.IdColumn,
            content: PrismaVectorStore.ContentColumn,
            role: PrismaVectorStore.ContentColumn,
          },
          filter: {
            conversationId: {
              equals: conversationId,
            },
          },
        });
        // todo: 控制拿多少，better design
        const count = modelType === "gpt-3.5-turbo" ? 3 : 2;
        const similar = (
          await vectorStore.similaritySearch(content, count)
        ).map((m) => m.metadata);
        const latest = await prisma.chatMessage.findMany({
          where: { conversationId },
          take: count,
          orderBy: { id: "desc" },
        });
        // todo: max token control
        // lodash 不能在 edge 里使用
        // 不能用 sortedUniqBy，因为我们没有先排序，会有 edge case
        return sortedUniqBy(
          sortBy([...similar, ...latest.reverse()], "id"),
          "id",
        ) as CreateMessage[];
      },
    ),

  list: protectedProcedure.input(ChatMessageWhereInputSchema).query(
    async (
      {
        ctx: {
          prisma,
          session: { user },
        },
        input,
      }, // 不能只按照时间倒序排序，因为有些会相同，然后 id 会顺序，因为 msg 是基于 cuid 的，所以可以直接按照 id 逆序，已经包含时间
    ) =>
      prisma.chatMessage.findMany({
        where: input,
        select: selectChatMessageForDetailView,
        orderBy: { id: "desc" },
        take: 10,
      }),
  ),

  syncLatestId: protectedProcedure
    .input(z.object({ conversationId: z.string() }))
    .mutation(
      async ({ ctx: { prisma }, input: { conversationId } }) =>
        (
          await prisma.chatMessage.findFirstOrThrow({
            take: -1,
            where: { conversationId },
          })
        ).id,
    ),
});
