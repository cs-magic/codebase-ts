import { LlmModelType } from "@/schema/llm"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { devtools, persist } from "zustand/middleware"

export interface LlmSlice {
  modelName: LlmModelType
  setModelName: (modelName: LlmModelType) => void
  conversationId: string | null
  setConversationId: (v: string) => void
  cleanConversationId: () => void
}

/**
 * zustand doesn't recommend `create without curried workaround`
 * see: https://github.com/pmndrs/zustand/blob/main/docs/guides/typescript.md#create-without-curried-workaround
 */
export const useLlmStore = create<LlmSlice>()(
  devtools(
    persist(
      immer((setState, getState, store) => ({
        modelName: "gpt-3.5-turbo",
        setModelName: (modelName) =>
          setState((state) => {
            state.modelName = modelName
          }),
        conversationId: null,
        setConversationId: (v) =>
          setState((state) => {
            state.conversationId = v
          }),
        cleanConversationId: () =>
          setState((state) => {
            state.conversationId = null
          }),
      })),
      {
        name: "v2agi",
        version: 0.1,
      },
    ),
  ),
)
