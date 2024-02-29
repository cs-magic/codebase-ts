import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
import { IConversationBasic } from "@/schema/conversation"
import { createConversation } from "./actions"

export interface ConversationListSlice {
  data: IConversationBasic[]

  addConversation: () => void
}

export const useConversationListStore = create<ConversationListSlice>()(
  devtools(
    immer((setState, getState, store) => ({
      data: [],

      addConversation: async () => {
        const newConversation = await createConversation({
          models: [],
          type: "LLM",
        })
        console.log({ newConversation })
        setState((state) => {
          state.data.push(newConversation)
        })
      },
    })),
  ),
)
