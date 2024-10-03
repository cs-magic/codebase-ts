import { prisma } from "@cs-magic/common/db/prisma";
import { PlatformType } from "@prisma/client";
import { type GetServerSidePropsContext } from "next";
import {
  type NextAuthOptions,
  type User as NextAuthUser,
  getServerSession,
} from "next-auth";
import { SendVerificationRequestParams } from "next-auth/providers/email";
import CredentialProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import EmailProvider from "next-auth/providers/email";
import GithubProvider from "next-auth/providers/github";

import {
  DEFAULT_LOCALE,
  SMS_PROVIDER_ID,
  URI,
  allowDangerousEmailAccountLinking,
  siteConfig,
} from "@/config";
import { authEnv } from "@/env.mjs";
import { pokettoPrismaAdapter } from "@/lib/db";
import { sendVerificationRequest } from "@/lib/email";
import { getOrigin } from "@cs-magic/common/router";
import { Provider } from "next-auth/providers/index";

export const emailFrom = siteConfig.welcomeEmailAddress;

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const createAuthOptions = ({
  locale,
  origin = getOrigin(),
}: {
  locale: string;
  origin?: string;
}): NextAuthOptions => {
  const providers: Provider[] = [
    CredentialProvider({
      id: SMS_PROVIDER_ID,
      type: "credentials",
      credentials: {
        phone: { type: "string", label: "phone" },
        code: { type: "string", label: "code" },
      },
      authorize: async (credentials) => {
        if (!credentials) throw new Error("no credentials");
        const { phone, code } = credentials;
        if (!phone || !code) throw new Error("no phone or code");
        const accountInDB = await prisma.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: "sms",
              providerAccountId: phone,
            },
            access_token: code,
          },
          include: { user: true },
        });
        if (!accountInDB) throw new Error("no account");
        return accountInDB.user;
      },
    }),

    EmailProvider({
      // 它之所以没有配置 server，是因为直接在 sendVerificationRequest 中完成邮箱的所有验证等操作了
      // 而我在本地初始化 aws 客户端，之所以不需要输入 credentials 信息，是因为我本地有 ~/.aws 配置文件
      from: emailFrom,
      /**
       * note: 如果发起邮箱登录的网址与环境变量中配置的 next-auth-url 不一致，则该函数将被跳过执行！并触发signIn！
       */
      sendVerificationRequest: (props: SendVerificationRequestParams) =>
        sendVerificationRequest({
          locale,
          origin,
          ...props,
        }),
    }),
  ];

  if (authEnv.GITHUB_CLIENT_ID && authEnv.GITHUB_CLIENT_SECRET) {
    providers.push(
      GithubProvider({
        clientId: authEnv.GITHUB_CLIENT_ID,
        clientSecret: authEnv.GITHUB_CLIENT_SECRET,
        allowDangerousEmailAccountLinking,
        profile(profile): NextAuthUser {
          return {
            id: profile.id.toString(),
            name: profile.name || profile.login,
            // username: profile.login, // 不能多加字段
            email: profile.email,

            image: profile.avatar_url,
            platformId: profile.id.toString(),
            platformType: PlatformType.github,
          };
        },
      }),
    );
  }

  if (authEnv.DISCORD_CLIENT_ID && authEnv.DISCORD_CLIENT_SECRET) {
    providers.push(
      DiscordProvider({
        clientId: authEnv.DISCORD_CLIENT_ID,
        clientSecret: authEnv.DISCORD_CLIENT_SECRET,
        allowDangerousEmailAccountLinking,
      }),
    );
  }

  // ref: https://next-auth.js.org/providers/google
  // GoogleProvider({
  // 	clientId: process.env.GOOGLE_ID,
  // 	clientSecret: process.env.GOOGLE_SECRET,
  // 	authorization: {
  // 		params: {
  // 			prompt: 'consent',
  // 			access_type: 'offline',
  // 			response_type: 'code',
  // 		},
  // 	},
  // }),
  /**
   * ...add more providers here.
   *
   * Most other providers require a bit more work than the Discord provider. For example, the
   * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
   * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
   *
   * @see https://next-auth.js.org/providers/github
   */

  return {
    pages: {
      signIn: URI.user.auth.signIn,
    },
    session: {
      strategy: "jwt", // 要用 jwt 的策略，否则每次请求拿不到 token，邮箱验证也没法做
    },
    callbacks: {
      signIn: async (signInParams) => {
        const { user, email, profile, account, credentials } = signInParams;
        console.log("signIn: ", signInParams); // 这个文件里，不要用 pino 之类的异步 log 函数，否则会导致 debug 困难
        user.platformId = user.id;
        user.platformType = account?.provider ?? PlatformType.Poketto;
        if (profile) {
          user.email = profile?.email;
        }
        return true;
      },

      async session(params) {
        // console.log("session: ", params)
        const { token, session } = params;
        if (token) {
          session.user.id = token.sub!; // 不要 token.id 了，妈的
          session.user.name = token.name;
          session.user.email = token.email;
          session.user.image = token.picture;
        }

        return session;
      },
    }, // ref: https://github.com/nextauthjs/next-auth/issues/6078
    adapter: pokettoPrismaAdapter,
    providers,
  };
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) =>
  getServerSession(
    ctx.req,
    ctx.res,
    createAuthOptions({ locale: DEFAULT_LOCALE }),
  );
