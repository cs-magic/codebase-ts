import {
  logger,
  PROFILE_UPDATE_PROVIDER_ID,
  userDetailSchema,
} from "@cs-magic/common"
import { prisma } from "@cs-magic/common/dist/db/prisma.js"
import CredentialsProvider from "next-auth/providers/credentials"

console.log({ CredentialsProvider })

export const ProfileUpdateProvider = CredentialsProvider({
  id: PROFILE_UPDATE_PROVIDER_ID,
  credentials: {
    id: { type: "string" },
    name: { type: "string" },
    image: { type: "string" },
  },
  authorize: async (credentials, req) => {
    logger.info("updating profile with credentials: %o", credentials)
    if (!credentials) throw new Error("no credentials")
    const { image, name, id } = credentials
    if (!image || !name) throw new Error("no name or image")

    await prisma.user.findUniqueOrThrow({ where: { id } })

    return prisma.user.update({
      where: { id },
      data: { name, image },
      ...userDetailSchema,
    })
  },
})