import { useModelStore } from "@/store/model.slice"
import { api } from "@/trpc/react"
import { toast } from "sonner"
import { signIn } from "next-auth/react"
import { useAddConversationWithQuery } from "@/store/conversation-list.slice"
import { useRouter } from "next/navigation"

export const useQueryModel = (fetchSSE: any) => {
  const setChannelId = useModelStore((state) => state.setChannelId)
  const channelId = useModelStore((state) => state.channelId)
  const pAppIds = useModelStore((state) => state.pAppIds)
  const query = useAddConversationWithQuery()
  const pAppId = pAppIds[0]
  const router = useRouter()

  const addMessage = api.message.add.useMutation({
    onError: (error) => {
      console.error({ error })
      if (error.data?.code === "UNAUTHORIZED") {
        void signIn()
        toast.error("您需要先登录才可以执行此操作！")
      } else {
        toast.error("发送失败！")
      }
    },
    onSuccess: async (message) => {
      // const { toConversationId: conversationId } = message
      // setChannelId(conversationId)
      // switch (pAppId) {
      //   case "gpt-3.5-turbo":
      //   case "gpt-4":
      //   case "gpt-4-32k":
      //     const body: ICreateConversationBody = {
      //       prompt: message.content,
      //       modelName: pAppId,
      //       conversationId,
      //     }
      //     const llmResData = await triggerLLM(body)
      //     console.log({ llmResData })
      //     void fetchSSE(llmResData.conversationId)
      //     break
      //   case "kimi":
      //   default:
      //     toast.warning(TODO)
      //     break
      // }
    },
  })

  return query

  // return async (text: string) => {
  // return addMessage.mutate({ id: channelId, text })
  // }
}
