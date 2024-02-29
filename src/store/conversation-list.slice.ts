import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
import { IConversationBasic } from "@/schema/conversation"
import { createConversation } from "./actions"
import { useModelStore } from "@/store/model.slice"

export interface ConversationListSlice {
  data: IConversationBasic[]

  addConversationWithoutQuery: () => Promise<string>
  addConversationWithQuery: (query: string) => Promise<string>
}

export const useConversationListStore = create<ConversationListSlice>()(
  devtools(
    immer((setState, getState, store) => ({
      data: [],

      addConversationWithoutQuery: async () => {
        const pApps = useModelStore.getState().pAppIds
        const newConversation = await createConversation({
          pApps: pApps.map((id) => ({ id })),
          type: "LLM",
        })
        console.log({ newConversation })
        setState((state) => {
          state.data.push(newConversation)
        })
        return newConversation.id
      },

      addConversationWithQuery: async (query) => {
        const conversationId = await getState().addConversationWithoutQuery()
        console.log({ conversationId })
        return conversationId
      },
    })),
  ),
)
