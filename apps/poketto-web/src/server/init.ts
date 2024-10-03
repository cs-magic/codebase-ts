import { paymentProducts } from "@cs-magic/common/stripe/config";
import {
  ChatMessageFormatType,
  PlatformType,
  PromptRoleType,
} from "@prisma/client";
import range from "lodash/range";
import { type AdapterUser } from "next-auth/adapters";

import {
  POKETTO_APP_AVATAR,
  POKETTO_APP_DESC,
  POKETTO_APP_ID,
  POKETTO_APP_LANGUAGE,
  POKETTO_APP_NAME,
  POKETTO_CATEGORY_MAIN,
  POKETTO_CATEGORY_SUB,
  POKETTO_CREATOR_AVATAR,
  POKETTO_CREATOR_DESC,
  POKETTO_CREATOR_EMAIL,
  POKETTO_CREATOR_ID,
  POKETTO_CREATOR_NAME,
  POKETTO_MODEL_NAME,
  POKETTO_MODEL_TEMPERATURE,
  POKETTO_SYSTEM_PROMPT,
  POKETTO_WELCOME_MESSAGE,
  USER_INVITATIONS_COUNT,
} from "@/config";
import { getWelcomeSystemNotification } from "@/lib/string";
import { type ExtendedPrismaClient } from "@/packages/common/src/db/prisma";

export const initSystem = async (prisma: ExtendedPrismaClient) => {
  const user = await prisma.user.upsert({
    where: {
      platform: { platformId: POKETTO_CREATOR_ID, platformType: "Poketto" },
    },
    update: {},
    create: {
      platformId: POKETTO_CREATOR_ID,
      platformType: "Poketto",
      platformArgs: {
        uri: "",
      },
      email: POKETTO_CREATOR_EMAIL,
      description: POKETTO_CREATOR_DESC,
      name: POKETTO_CREATOR_NAME,
      image: POKETTO_CREATOR_AVATAR.src,
    },
  });

  // 不要nest在user里写，否则app删除后，就脱钩了
  await prisma.pokettoApp.upsert({
    where: {
      platform: { platformId: POKETTO_APP_ID, platformType: "Poketto" },
    },
    update: {},
    create: {
      creator: {
        connect: {
          id: user.id,
        },
      },
      name: POKETTO_APP_NAME,
      language: POKETTO_APP_LANGUAGE,
      avatar: POKETTO_APP_AVATAR.src,
      platformId: POKETTO_APP_ID,
      platformType: PlatformType.Poketto,
      desc: POKETTO_APP_DESC,
      modelName: POKETTO_MODEL_NAME,
      temperature: POKETTO_MODEL_TEMPERATURE,
      prompts: {
        create: [
          {
            role: "system",
            content: POKETTO_SYSTEM_PROMPT,
          },
          {
            role: "assistant",
            content: POKETTO_WELCOME_MESSAGE,
          },
        ],
      },
      category: {
        connectOrCreate: {
          where: {
            category: {
              main: POKETTO_CATEGORY_MAIN,
              sub: POKETTO_CATEGORY_SUB,
            },
          },
          create: { main: POKETTO_CATEGORY_MAIN, sub: POKETTO_CATEGORY_SUB },
        },
      },
      isOpenSource: false,
      state: {
        create: {
          calls: 0,
          forks: 0,
          shares: 0,
          stars: 0,
          tips: 0,
          views: 0,
        },
      },
    },
  });

  for (const product of paymentProducts) {
    await prisma.stripeProduct.upsert({
      where: { id: product.id },
      update: {},
      create: product,
    });
  }

  console.log("✅ Successfully initialized poketto system ~");
};

/**
 *
 * @param {ExtendedPrismaClient} prisma
 * @param {} user 注意是 next-auth 里 user
 */
export const initUser = async (
  prisma: ExtendedPrismaClient,
  user: Omit<AdapterUser, "id">,
) => {
  const pokettoRealApp = await prisma.pokettoApp.findUniqueOrThrow({
    where: {
      platform: {
        platformId: POKETTO_APP_ID,
        platformType: PlatformType.Poketto,
      },
    },
  });

  const createdUser = await prisma.user.create({
    include: {
      conversations: {
        include: {
          messages: true,
        },
      },
      invitedFrom: true,
    },
    data: {
      ...user,
      platformId: user.email ?? user.name,
      platformType: PlatformType.Poketto,
      conversations: {
        create: [
          {
            appId: pokettoRealApp.id,
            messages: {
              create: [
                {
                  content: getWelcomeSystemNotification(
                    user.name ?? "bro",
                    POKETTO_APP_NAME,
                  ),
                  format: ChatMessageFormatType.systemNotification,
                },
                {
                  content: POKETTO_SYSTEM_PROMPT,
                  role: PromptRoleType.system,
                },
                {
                  content: POKETTO_WELCOME_MESSAGE,
                  role: PromptRoleType.assistant,
                },
              ],
            },
          },
        ],
      },
      invitedFrom: {
        createMany: {
          data: range(USER_INVITATIONS_COUNT).map(() => ({})),
        },
      },
    },
  });

  console.log(
    `✅ Successfully created user(id=${createdUser.id}, name=${createdUser.name}) ~`,
  );
  return createdUser;
};
