import { prisma } from "@cs-magic/common/db/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type PrismaClient } from "@prisma/client";
import {
  type AdapterUser,
  type Adapter as NextAuthAdapter,
} from "next-auth/adapters";

import { initUser } from "@/server/init";

const { createUser: prismaCreateUser, ...adapterExtra } = PrismaAdapter(
  prisma as unknown as PrismaClient,
);

export const pokettoPrismaAdapter: NextAuthAdapter = {
  /**
   * example user:
   image: "https://avatars.githubusercontent.com/u/33591398?v=4"
   platformId: "33591398"
   platformType: "Poketto"
   emailVerified: null
   */
  createUser: async (user) => {
    console.log("creating user: ", { user });
    // 有可能会重新插入！！！
    const existed = await prisma.user.findUnique({
      where: {
        platform: {
          platformId: user.platformId,
          platformType: user.platformType,
        },
      },
    });
    return (existed || (await initUser(prisma, user))) as AdapterUser;
  },
  ...adapterExtra,
};
