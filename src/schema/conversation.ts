import { z } from "zod"
import { ConversationType, Prisma } from "@prisma/client"
import validator = Prisma.validator
import ModelDefaultArgs = Prisma.ModelDefaultArgs
import ModelGetPayload = Prisma.ModelGetPayload
import ConversationModelDefaultArgs = Prisma.ConversationModelDefaultArgs
import ConversationModelGetPayload = Prisma.ConversationModelGetPayload
import ConversationDefaultArgs = Prisma.ConversationDefaultArgs
import ConversationGetPayload = Prisma.ConversationGetPayload

export const createConversationSchema = z.object({
  models: z
    .object({
      modelId: z.string(),
      prompt: z.string().nullable(),
      temperature: z.number().nullable(),
    })
    .array(),
  type: z.nativeEnum(ConversationType),
})

export const modelSchema = validator<ModelDefaultArgs>()({
  include: {
    company: true,
  },
})
export type IModel = ModelGetPayload<typeof modelSchema>

export const conversationModelSchema =
  validator<ConversationModelDefaultArgs>()({
    include: {
      model: modelSchema,
    },
  })
export type IConversationModel = ConversationModelGetPayload<
  typeof conversationModelSchema
>

export const conversationSchema = validator<ConversationDefaultArgs>()({
  include: {
    models: true,
    fromUser: true,
  },
})
export type IConversation = ConversationGetPayload<typeof conversationSchema>
export type IConversationBasic = Pick<
  IConversation,
  "id" | "updatedAt" | "title"
>
