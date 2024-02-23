import { useModelStore } from "@/store/model.slice"
import { useEffect, useState } from "react"
import { ITokenEventData } from "@/schema/api"

export const useLlmOutput = () => {
  const { cid } = useModelStore((state) => ({
    cid: state.conversationId,
  }))
  const [output, setOutput] = useState("")

  useEffect(() => {
    if (!cid) return
    console.log({ cid })
    const sse = new EventSource(`/api/llm?c=${cid}`)
    sse.addEventListener("token", (ev: MessageEvent<string>) => {
      const data = JSON.parse(ev.data) as ITokenEventData
      console.log(data)
      setOutput((output) => output + data.content)
    })
    sse.onopen = () => {
      console.log("event source opened")
    }
    sse.onerror = (err) => {
      console.log("event source error: ", err)
      sse.close()
    }
    return () => {
      sse.close()
    }
  }, [cid])

  return { output }
}
