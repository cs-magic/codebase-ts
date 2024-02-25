"use client"

import { useRef } from "react"
import { Textarea } from "@/components/textarea"
import { useFetchSSE } from "@/hooks/use-llm-output"
import { useSocketChannel } from "@/lib/puser/client/hooks"
import { useQueryModel } from "@/hooks/use-query-model"

export const QueryModel = () => {
  const refInput = useRef<HTMLTextAreaElement>(null)
  const { output, fetchSSE } = useFetchSSE()

  const queryModel = useQueryModel(fetchSSE)

  void useSocketChannel()

  return (
    <div className={"w-full"}>
      <Textarea
        className={"w-full"}
        ref={refInput}
        onKeyDown={(event) => {
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
