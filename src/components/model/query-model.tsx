"use client"

import { useModelStore } from "@/store/model.slice"
import { useRef } from "react"
import { Textarea } from "@/components/textarea"
import { toast } from "sonner"

import { ICreateConversationBody, IPostLlmRes } from "@/schema/api"
import { useLlmOutput } from "@/hooks/use-llm-output"
import { api } from "@/trpc/react"
import { TODO } from "@/config/ui"

export const QueryModel = () => {
  const { modelName, setCid, cid } = useModelStore((state) => ({
    cid: state.conversationId,
    setCid: state.setConversationId,
    modelName: state.modelName,
  }))

  const refInput = useRef<HTMLTextAreaElement>(null)
  const { output } = useLlmOutput()

  const addMessage = api.message.add.useMutation()
  const onAddMessage = api.message.onAdd.useSubscription(undefined, {
    onData: (data) => {
      console.log({ data })
    },
    onError: (err) => {
      console.error({ err })
    },
  })

  return (
    <div className={"w-full"}>
      <Textarea
        className={"w-full"}
        ref={refInput}
        onKeyDown={async (event) => {
          if (!refInput.current) return
          const prompt = refInput.current.value
          if (!prompt) return

          const key = event.key
          if (key !== "Enter" || event.nativeEvent.isComposing) return

          // prevent add new line
          event.preventDefault()

          console.log({ key, modelName, prompt })
          addMessage.mutate({ text: prompt })

          switch (modelName) {
            case "gpt-3.5-turbo":
            case "gpt-4":
            case "gpt-4-32k":
              const body: ICreateConversationBody = { prompt, modelName }
              const res = await fetch("/api/llm", {
                method: "POST",
                body: JSON.stringify(body),
              })
              const { conversationId } = (await res.json()) as IPostLlmRes
              setCid(conversationId)
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
        }}
      />

      <div>{output}</div>
    </div>
  )
}
