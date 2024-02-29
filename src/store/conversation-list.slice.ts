"use client"

import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
import { IConversationBasic } from "@/schema/conversation"
import { useModelStore } from "@/store/model.slice"
import { createConversation } from "@/store/createConversation"
import { useEffect } from "react"
import { api } from "@/trpc/react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export interface ConversationListSlice {
  data: IConversationBasic[]
}

export const useConversationListStore = create<ConversationListSlice>()(
  devtools(
    immer((setState, getState, store) => ({
      data: [],
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
    console.log("inited conversations: ", conversations)
    useConversationListStore.setState((state) => {
      state.data = conversations
    })
  }, [conversations])
}

export const useAddConversationWithoutQuery = () => {
  const router = useRouter()

  return async () => {
    const pApps = useModelStore.getState().pAppIds
    console.log({ pApps })

    const newConversation = await createConversation({
      pApps: pApps.map((id) => ({ id })),
      type: "LLM",
    })
    console.log({ newConversation })

    useConversationListStore.setState((state) => {
      // first
      state.data.splice(0, 0, newConversation)
    })
    router.push(`/c/${newConversation.id}`)
  }
}

export const useAddConversationWithQuery = () => {
  const addConversationWithoutQuery = useAddConversationWithoutQuery()
  // todo: prompt
  return (prompt: string) => {
    void addConversationWithoutQuery()
  }
}

/**
 * 不要用乐观更新，否则会乱
 */
export const useDeleteConversation = () => {
  const deleteConversation = api.llm.delConversation.useMutation({})

  return async (conversationId: string) => {
    void deleteConversation
      .mutateAsync(conversationId)
      .catch((error) => {
        console.error(error)
        toast.error("删除失败！")
      })
      .then(() => {
        toast.success("删除成功")
        useConversationListStore.setState((state) => {
          state.data = state.data.filter((d) => d.id !== conversationId)
        })
      })
  }
}
