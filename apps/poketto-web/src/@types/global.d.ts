declare global {
  // 要放在里面
  import { type Message } from "ai/react"
  import { ModelType } from "@/ds"

  namespace PrismaJson {
    // you can use typical basic types
    type ModelPlatformArgs = {
      prompts: Message[]
    }

    type UserPlatformArgs = {
      uri?: string
    }

    export type ModelQuota = Record<ModelType, number>
  }
}

declare global {
  /**
   * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
   * object and keep type safety.
   *
   * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
   */
  module "next-auth" {
    import { type DefaultSession } from "next-auth"

    interface Session extends DefaultSession {
      user: DefaultSession["user"] & {
        id: string
      }
    }

    // ref:
    // 1. https://next-auth.js.org/getting-started/typescript#popular-interfaces-to-augment
    // 2. next-auth/core/types.d.ts
    /**
     * The shape of the user object returned in the OAuth providers' `profile` callback,
     * or the second parameter of the `session` callback, when using a database.
     */
    interface User extends DefaultUser {
      platformId: string
      platformType: PlatformType
    }

    /**
     * Usually contains information about the provider being used
     * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
     */
    // interface Account {}
    /** The OAuth profile returned from your provider */
    // interface Profile {}
  }
}
