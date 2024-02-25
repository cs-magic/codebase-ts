import { useModelStore } from "@/store/model.slice"
import { api } from "@/trpc/react"
import { toast } from "sonner"
import { ICreateConversationBody } from "@/schema/api"
import { TODO } from "@/config/ui"

import { triggerLLM } from "@/app/api/llm/actions"

export const useQueryModel = (fetchSSE: any) => {
  const { modelName, setChannelId, channelId } = useModelStore((state) => ({
    modelName: state.modelName,
    setChannelId: state.setChannelId,
    channelId: state.channelId,
  }))

  const addMessage = api.message.add.useMutation({
    onError: (error) => {
      console.error(error)
      toast.error("发送失败！")
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

        case "gpt-3.5-turbo-16k":
        case "gpt-3.5-turbo-16k-0613":
        case "gpt-3.5-turbo-0301":
        case "gpt-3.5-turbo-0613":
        case "gpt-3.5-turbo-1106":
        case "gpt-4-32k-0314":
        case "gpt-4-32k-0613":
        case "gpt-4-0314":
        case "gpt-4-0613":
        case "gpt-4-1106-preview":
        case "gpt-4-vision-preview":
          throw new Error("Unsupported Yet!")

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