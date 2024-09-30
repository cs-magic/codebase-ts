import { sha1 } from "js-sha1"

import { FLOWGPT_HOMEPAGE } from "@/config"
import { type IMAGE_SIZE } from "@/ds"

/**
 * ref: https://robohash.org/
 */
export const getRobotAvatar = (
  key: string,
  {
    width = 256,
    height = 256,
    mode = 4,
  }: {
    width?: number
    height?: number
    mode?: number
  } = {},
) => `https://robohash.org/${key}?set=set${mode}&size=${width}x${height}`

export const getConversationsLink = (userId: string) => `/c/${userId}`
export const getConversationLink = (userId: string, appId: string) => `/c/${userId}/${appId}`

// export const getFlowgptUserLink = (userId: string) => `${FLOWGPT_URL}/user/${userId}`
export const getFlowgptUserLink = (userId: string) => `${FLOWGPT_HOMEPAGE}/@${userId}`
export const getUserLink = (userId: string) => `/u/${userId}`

export const getWelcomeSystemNotification = (userName: string, appName?: string) =>
  `Welcome ${userName}${appName ? `to join the ${appName}` : ""} !`

export const getImageUri = (uri: string, size: IMAGE_SIZE = "xs"): string => {
  if (uri.includes("flowgpt")) return `/api/file?filename=${sha1(uri)}&filesize=${size}`
  if (uri.startsWith("/") || uri.startsWith("http") || size === "raw") return uri
  return getRobotAvatar(uri, size === "xs" ? { width: 64, height: 64 } : { width: 256, height: 256 })
}

export function getCuidTimestamp(cuidStr: string): Date {
  const cuidParts = cuidStr.split("-")

  const timestampPortion = cuidParts[0]!

  const timestampHex = timestampPortion.substring(1) // Remove the 'c' prefix

  const timestampMillis = parseInt(timestampHex, 36) // Convert from base36 to decimal

  return new Date(timestampMillis)
}
