"use client"

import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
import { IConversationBasic } from "@/schema/conversation"
import { useModelStore } from "@/store/model.slice"
import { createConversation } from "@/store/createConversation"
import { useEffect } from "react"
import { api } from "@/trpc/react"

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
        console.log({ pApps })

        const newConversation = await createConversation({
          pApps: pApps.map((id) => ({ id })),
          type: "LLM",
        })
        console.log({ newConversation })

        setState((state) => {
          state.data.push(newConversation)
        })
        location.href = `/c/${newConversation.id}`
        return newConversation.id
      },

      addConversationWithQuery: async (query) => {
        console.log({ query })

        const conversationId = await getState().addConversationWithoutQuery()
        console.log({ conversationId })
        return conversationId
      },
    })),
  ),
)

/**
 * 直接导出 hook，不要用 `use server`，写法反而麻烦
 * 而且 nextjs 限制在组件没有 mount 之前就更新数据状态
 */
export const useInitConversationList = () => {
  const { data: conversations = [] } = api.llm.listConversations.useQuery()

  useEffect(() => {
    console.log("[conversation-list] inited conversations: ", conversations)
    useConversationListStore.setState((state) => {
      state.data = conversations
    })
  }, [conversations])
}
