import { getWelcomeSystemNotification } from "@/lib/string";
import {
  POKETTO_APP_ID,
  POKETTO_APP_NAME,
  POKETTO_SYSTEM_PROMPT,
  POKETTO_WELCOME_MESSAGE,
  USER_INVITATIONS_COUNT,
} from "@/config";
import {
  ChatMessageFormatType,
  PlatformType,
  Prisma,
  PrismaClient,
  PromptRoleType,
} from "@prisma/client";
import _ from "lodash";
import UserCreateInput = Prisma.UserCreateInput;

const user: UserCreateInput & {
  platformType: PlatformType;
} = {
  platformId: "xxx",
  platformType: PlatformType.Poketto,
};

const c = new PrismaClient({}).$extends({
  result: {
    user: {
      // todo: for-production-use index design
      impact: {
        needs: {
          name: true, // @ts-ignore
          followedBy: true, // 必须加上，否则没有数据
        }, // ref:
        compute: (user) =>
          user.followedBy.length * 100 + (user.name ?? "").length,
      },
    },
    conversation: {
      latestMessage: {
        needs: {
          // @ts-ignore
          messages: true,
        },
        compute: (conv) => conv.messages[conv.messages.length - 1],
      },
    },
  },
});

async function f() {
  const upsertedUser = await c.user.upsert({
    include: {
      conversations: {
        include: {
          app: true,
          messages: true,
        },
      },
      invitedFrom: true,
    },
    // 跨平台用邮箱，但是也没法保证（比如github是可以隐藏邮箱的），参考帖子，是个伪命题 (link account)
    // 因此，我们直接暴力点，把平台id和用户名直接绑定
    where: {
      platform: {
        platformId: user.platformId,
        platformType: user.platformType,
      },
    },
    update: {},
    create: {
      name: user.name,
      email: user.email,
      platformId: user.platformId,
      platformType: user.platformType,
      image: user.image,
      emailVerified: user.emailVerified,
      conversations: {
        create: [
          {
            app: {
              connect: { id: POKETTO_APP_ID },
            },
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
          data: _.range(USER_INVITATIONS_COUNT).map(() => ({})),
        },
      },
    },
  });
  console.log("created user: ", { user, upsertedUser });
}

void f();
