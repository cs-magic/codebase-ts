import { proxy, useSnapshot } from "valtio"
import { IConversationBasic, IPApp } from "@/schema/conversation"
import { api } from "@/trpc/react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { IMessageInChat } from "@/schema/message"
import { nanoid } from "nanoid"
import { remove } from "lodash"
import { UnexpectedError } from "@/schema/error"

export const pAppsState = proxy<{ pApps: IPApp[] }>({
  pApps: [],
})
export const conversationsState = proxy<{
  conversationId: string | null
  conversations: IConversationBasic[]
}>({ conversations: [], conversationId: null })
export const messagesState = proxy<IMessageInChat[]>([])

export const addPApp = (pApp: IPApp) => {
  pAppsState.pApps.push(pApp)
}
export const delPApp = (id: string) => {
  // 至少要有1个
  if (pAppsState.pApps.length === 1) return
  remove(pAppsState.pApps, (i) => i.id === id)
}

export const useInitConversations = () => {
  const { data: conversations = [] } = api.llm.listConversations.useQuery()

  useEffect(() => {
    console.log("inited conversations: ", conversations)
    conversationsState.conversations = conversations
  }, [
    // 自己确保只运行一次
    conversations,
  ])
}

export const useAddConversation = () => {
  const router = useRouter()

  const { isLoading, mutateAsync } = api.llm.createConversation.useMutation({
    onSuccess: (conversation) => {
      conversationsState.conversations.splice(0, 0, conversation)
      toast.success("新建会话成功")
      router.push(`/tt/${conversation.id}`)
      messagesState.length = 0 // clean array
    },
    onError: (error) => {
      console.error(error)
      toast.error("新建会话失败")
    },
  })

  const addConversationWithoutPrompt = () =>
    mutateAsync({ pApps: pAppsState.pApps, type: "LLM" })

  return {
    addConversationWithoutPrompt,
    isLoading,
  }
}

export const useQueryInHomePage = () => {
  const { addConversationWithoutPrompt, isLoading } = useAddConversation()
  const { queryInChatLayout } = useQueryInChatLayout()
  const queryInHomePage = async (query: string) => {
    const conversation = await addConversationWithoutPrompt()
    queryInChatLayout(conversation.id, query)
  }
  return { queryInHomePage, isLoading }
}

/**
 * todo: core logic
 */
export const useQueryInChatLayout = () => {
  const queryInChatLayout = (conversationId: string | null, query: string) => {
    if (!conversationId) return

    messagesState.push({
      id: nanoid(),
      updatedAt: new Date(),
      content: query,
      role: "user",
    })
    toast.message("query: " + query)
  }
  return { queryInChatLayout }
}

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
        const index = conversationsState.conversations.findIndex(
          (i) => i.id === conversationId,
        )
        if (index < 0) return
        conversationsState.conversations.splice(index, 1)
      })
  }
}
