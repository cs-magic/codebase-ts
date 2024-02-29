import { z } from "zod"
import { ConversationType, Prisma } from "@prisma/client"
import validator = Prisma.validator
import ModelDefaultArgs = Prisma.ModelDefaultArgs
import ModelGetPayload = Prisma.ModelGetPayload
import ConversationDefaultArgs = Prisma.ConversationDefaultArgs
import ConversationGetPayload = Prisma.ConversationGetPayload
import PAppDefaultArgs = Prisma.PAppDefaultArgs
import PAppGetPayload = Prisma.PAppGetPayload

export const createConversationSchema = z.object({
  pApps: z
    .object({
      id: z.string(),
    })
    .array(),
  type: z.nativeEnum(ConversationType),
})
export type ICreateConversation = z.infer<typeof createConversationSchema>

export const modelSchema = validator<ModelDefaultArgs>()({
  include: {
    company: true,
  },
})
export type IModel = ModelGetPayload<typeof modelSchema>

export const pAppSchema = validator<PAppDefaultArgs>()({
  include: {
    model: modelSchema,
  },
})
export type IPApp = PAppGetPayload<typeof pAppSchema>

export const conversationSchema = validator<ConversationDefaultArgs>()({
  include: {
    pApps: pAppSchema,
    fromUser: true,
  },
})
export type IConversation = ConversationGetPayload<typeof conversationSchema>
export type IConversationBasic = Pick<
  IConversation,
  "id" | "updatedAt" | "title"
>
