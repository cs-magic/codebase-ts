"use client"

import { useModelStore } from "@/store/model.slice"
import { useRef } from "react"
import { Textarea } from "@/components/textarea"
import { toast } from "sonner"

import { ICreateConversationBody, IPostLlmRes } from "@/schema/api"
import { useLlmOutput } from "@/hooks/use-llm-output"
import { api } from "@/trpc/react"
import { TODO } from "@/config/ui"
import { useSocketChannel } from "@/lib/puser/client/hooks"

export const QueryModel = () => {
  const refInput = useRef<HTMLTextAreaElement>(null)
  const { output } = useLlmOutput()

  const queryModel = useQueryModel()

  void useSocketChannel()

  return (
    <div className={"w-full"}>
      <Textarea
        className={"w-full"}
        ref={refInput}
        onKeyDown={ (event) => {
          if (!refInput.current) return

          const prompt = refInput.current.value
          if (!prompt) return

          const key = event.key
          if (key !== "Enter" || event.nativeEvent.isComposing) return

          // prevent add new line
          event.preventDefault()

          console.log({ key, prompt })
          queryModel(prompt)
        }}
      />

      <div>{output}</div>
    </div>
  )
}

const useQueryModel = () => {
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
      setChannelId(message.toConversationId)

      switch (modelName) {
        case "gpt-3.5-turbo":
        case "gpt-4":
        case "gpt-4-32k":
          const body: ICreateConversationBody = {
            prompt: message.content,
            modelName,
          }
          const res = await fetch("/api/llm", {
            method: "POST",
            body: JSON.stringify(body),
          })
          const llmResData = (await res.json()) as IPostLlmRes
          console.log({ llmResData })
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

  return (text: string) => addMessage.mutate({ id: channelId, text })
}
