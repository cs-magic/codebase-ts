import { PrismaAdapter } from "@auth/prisma-adapter"
import {
  type DefaultSession,
  getServerSession,
  type NextAuthOptions,
} from "next-auth"
import { type Adapter } from "next-auth/adapters"
import Credentials from "next-auth/providers/credentials"
import { db } from "@/server/db"
import { SMS_PROVIDER_ID } from "@/config/const"
import { $smsSignIn } from "@/server/sms"

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"]
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    // compatible with credential providers
    jwt: ({ session, user, profile, token }) => {
      if (user) {
        token.sub = user.id
      }
      return token
    },

    session: ({ session, user, token }) => {
      console.log("[next-auth] session: ", { session, user })
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub ?? user.id,
        },
      }
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    Credentials({
      id: SMS_PROVIDER_ID,
      credentials: {
        phone: { type: "string" },
        code: { type: "string" },
      },
      authorize: (credentials, req) => {
        if (!credentials) throw new Error("no credentials")
        const { code, phone } = credentials
        if (!code || !phone) throw new Error("no phone or code")

        return $smsSignIn(credentials)
      },
    }),

    // DiscordProvider({
    //   clientId: env.DISCORD_CLIENT_ID,
    //   clientSecret: env.DISCORD_CLIENT_SECRET,
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
  ],
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions)
