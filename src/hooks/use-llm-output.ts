import { useState } from "react"
import { ITokenEventData } from "@/schema/api"

export const
    useFetchSSE = () => {
  const [output, setOutput] = useState("")

  const fetchSSE = async (channelId?: string) => {
    console.log({ channelId })
    if (!channelId) return
    // console.log({ cid })
    const sse = new EventSource(`/api/llm?c=${channelId}`)
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
  }

  return { fetchSSE, output }
}
