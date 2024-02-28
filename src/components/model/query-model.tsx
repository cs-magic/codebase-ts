"use client"

import { useState } from "react"
import { TextareaAuto } from "@/components/textarea"
import { useFetchSSE } from "@/hooks/use-llm-output"
import { useQueryModel } from "@/hooks/use-query-model"
import { ArrowUpIcon, Paperclip } from "lucide-react"
import { IconContainer } from "@/components/containers"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const QueryModel = () => {
  const { output, fetchSSE } = useFetchSSE()
  const [input, setInput] = useState("")

  const queryModel = useQueryModel(fetchSSE)

  // void useSocketChannel()

  const onSubmit = () => {
    console.log({ input })
    if (!input) return
    queryModel(input)
  }

  return (
    <div className={"w-full"}>
      <div className={"flex rounded-3xl border p-2"}>
        <IconContainer className={"w-6 h-6 shrink-0 interactive"}>
          <Paperclip />
        </IconContainer>

        <TextareaAuto
          className={"px-2"}
          autoFocus
          // value={input}
          onChange={(event) => setInput(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key !== "Enter" || event.nativeEvent.isComposing) return
            // prevent add new line
            event.preventDefault()
            onSubmit()
          }}
        />

        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <IconContainer
              className={cn(
                "w-6 h-6 shrink-0",
                input &&
                  "bg-primary-foreground/90 hover:bg-primary-foreground/90 text-white rounded-full",
              )}
              onClick={onSubmit}
            >
              <ArrowUpIcon className={cn()} />
            </IconContainer>
          </TooltipTrigger>

          <TooltipContent side={"bottom"}>发送</TooltipContent>
        </Tooltip>
      </div>

      <div>{output}</div>
    </div>
  )
}
