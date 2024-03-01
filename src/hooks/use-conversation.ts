import { proxy } from "valtio"
import { IConversationBasic, IPApp } from "@/schema/conversation"
import { api } from "@/trpc/react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { IMessageInChat } from "@/schema/message"
import { nanoid } from "nanoid"
import { remove } from "lodash"

export const pAppsState = proxy<{ pApps: IPApp[] }>({
  pApps: [],
})
export const conversationsState = proxy<{
  conversations: IConversationBasic[]
}>({ conversations: [] })
export const messagesState = proxy<IMessageInChat[]>([])

export const addPApp = (pApp: IPApp) => {
  pAppsState.pApps.push(pApp)
}
export const delPAppId = (id: string) => {
  remove(pAppsState.pApps, (i) => i.id === id)
}

export const useInitConversationList = () => {
  const { data: conversations = [] } = api.llm.listConversations.useQuery()

  useEffect(() => {
    console.log("inited conversations: ", conversations)
    conversationsState.conversations = conversations
  }, [conversations])
}

export const useAddConversation = () => {
  const router = useRouter()

  const { isLoading, mutateAsync } = api.llm.createConversation.useMutation({
    onSuccess: (conversation) => {
      conversationsState.conversations.splice(0, 0, conversation)
      toast.success("新建会话成功")
      router.push(`/c/${conversation.id}`)
      messagesState.length = 0 // clean array
    },
    onError: (error) => {
      console.error(error)
      toast.error("新建会话失败")
    },
  })

  const addConversationWithoutPrompt = () =>
    mutateAsync({ pApps: pAppsState.pApps, type: "LLM" })

  const addConversationWithPrompt = async (prompt: string) => {
    const conversation = await addConversationWithoutPrompt()
    messagesState.push({
      id: nanoid(),
      updatedAt: new Date(),
      content: prompt,
      role: "user",
    })
  }

  return {
    addConversationWithoutPrompt,
    addConversationWithPrompt,
    isLoading,
  }
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
