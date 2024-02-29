import { useModelStore } from "@/store/model.slice"
import { api } from "@/trpc/react"
import { toast } from "sonner"
import { ICreateConversationBody } from "@/schema/api"
import { TODO } from "@/config/ui"

import { triggerLLM } from "@/app/api/llm/actions"
import { signIn } from "next-auth/react"

export const useQueryModel = (fetchSSE: any) => {
  const { setChannelId, channelId, models } = useModelStore((state) => ({
    setChannelId: state.setChannelId,
    channelId: state.channelId,
    models: state.pAppIds,
  }))
  const modelName = models[0]

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
      const { toConversationId: conversationId } = message
      setChannelId(conversationId)

      switch (modelName) {
        case "gpt-3.5-turbo":
        case "gpt-4":
        case "gpt-4-32k":
          const body: ICreateConversationBody = {
            prompt: message.content,
            modelName,
            conversationId,
          }
          const llmResData = await triggerLLM(body)
          console.log({ llmResData })
          void fetchSSE(llmResData.conversationId)
          break
        case "kimi":
        default:
          toast.warning(TODO)
          break
      }
    },
  })

  return (text: string) => {
    return addMessage.mutate({ id: channelId, text })
  }
}
