import { PrismaClient } from "@prisma/client";

function getExtendedClient() {
  const c = new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? [
            // 'query',
            "warn",
            "error",
          ]
        : ["error"],
  });
  // 这个思想是很好的，但是 not type-safe，目前阶段避免使用，可以自己写一些 transform 函数
  // .$extends({
  //   result: {
  //     user: {
  //       impact: {
  //         needs: {
  //           name: true, // @ts-ignore
  //           followedByCount: true, // 必须加上，否则没有数据
  //         }, // ref:
  //         compute: (user) => user.followedByCount * 100 + (user.name ?? "").length,
  //       },
  //     },
  //     conversation: {
  //       latestMessage: {
  //         needs: {
  //           // @ts-ignore
  //           messages: true,
  //         },
  //         compute: (conv) => conv.messages[conv.messages.length - 1],
  //       },
  //     },
  // },
  // })

  globalForDB.prisma = c;

  return c;
}

export type ExtendedPrismaClient = ReturnType<typeof getExtendedClient>;

const globalForDB = globalThis as unknown as {
  prisma?: ExtendedPrismaClient;
};
export const prisma = globalForDB.prisma ?? getExtendedClient();

// 开发模式下，每次复用连接
if (process.env.NODE_ENV !== "production") {
  globalForDB.prisma = prisma;
}
