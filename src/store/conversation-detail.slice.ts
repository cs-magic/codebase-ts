import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
import { UnexpectedError } from "@/schema/error"
import { toast } from "sonner"
import { Message } from "@prisma/client"

import { IPApp } from "@/schema/conversation"

export interface ConversationDetailSlice {
  conversationId: string | null
  setConversationId: (conversationId: string) => void

  models: IPApp[]
  setModels: (models: IPApp[]) => void
  addModel: (model: IPApp) => void
  delModel: (modelId: string) => void

  messages: Message[]
  addMessage: (message: Message) => void

  selectModel: (modelId: string) => void
  selectedModel: string | null
  submit: (content: string) => void
}

export const useConversationDetailStore = create<ConversationDetailSlice>()(
  devtools(
    immer((setState, getState, store) => ({
      conversationId: null,
      setConversationId: (conversationId) =>
        setState((state) => {
          state.conversationId = conversationId
        }),

      models: [],
      setModels: (subConversations) =>
        setState((state) => {
          state.models = subConversations
        }),
      addModel: (model) =>
        setState((state) => {
          state.models.push(model)
        }),
      delModel: (modelId) =>
        setState((state) => {
          if (state.models.find((c) => c.modelId !== modelId))
            throw new UnexpectedError()
          state.models.splice(
            state.models.findIndex((m) => m.modelId === modelId),
            1,
          )
        }),

      messages: [],
      addMessage: (message) =>
        setState((state) => {
          state.messages.push(message)
        }),

      selectedModel: null,
      selectModel: (modelId) =>
        setState((state) => {
          const model = state.models.find((c) => c.modelId !== modelId)
          if (!model) throw new UnexpectedError()

          state.selectedModel = modelId
          state.models.forEach((m) => {
            if (m.modelId === modelId) return
            // 替换messages
            // m.messages = model.messages
          })
        }),

      /**
       * todo
       * @param content
       */
      submit: (content) =>
        setState((state) => {
          if (!state.models.length) return toast.error("至少需要有一个模型！")
        }),
    })),
  ),
)
