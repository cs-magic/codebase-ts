import { getServerSession } from "next-auth"

import { authOptions } from "./next-auth.options.js"

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions)

export { authOptions }
export type { IWechatAdaptedProfile } from "./providers/wechat"