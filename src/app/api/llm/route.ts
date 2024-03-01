import { NextRequest } from "next/server"
import { callChatGPT } from "@/server/llm/openai"
import { last } from "lodash"
import { MessageRole } from "@prisma/client"
import { UnexpectedError } from "@/schema/error"
import { staticCreate } from "@/lib/utils"

type IClient = {
  onEvent: (event: string) => Promise<void>
}
type IRequest = { data: string; finished: boolean; clients: IClient[] }
const manager = staticCreate<Record<string, IRequest>>(() => ({}))

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const requestId = searchParams.get("r")
  console.log("[sse]: ", { requestId, manager })
  if (!requestId)
    return Response.json({ error: "no requestId found" }, { status: 400 })
  const request = manager[requestId]
  if (!request)
    // todo: db
    return Response.json({ error: "no request running" }, { status: 400 })
  console.log("[sse]: ", { request })

  const responseStream = new TransformStream()
  const writer = responseStream.writable.getWriter()
  const encoder = new TextEncoder()

  const init = async () => {
    const sendToken = async (token: string, event = "token") => {
      // console.log(`client sending token: [${token}]`)
      await writer.write(
        encoder.encode(`event: ${event}\ndata: ${JSON.stringify(token)}\n\n`),
      )
    }
    await sendToken(request.data)
    request.clients.push({
      onEvent: sendToken,
    })
  }

  void init() // DO NOT await

  return new Response(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
    },
  })
}

export const triggerLLM = async (context: {
  requestId: string
  modelId: string
  messages: { content: string; role: MessageRole }[]
  // todo: more args
}) => {
  console.log("[llm] triggered: ", context)

  // register into manger for later requests to read
  const { requestId, modelId, messages } = context
  const r: IRequest = (manager[requestId] = {
    finished: false,
    data: "",
    clients: [],
  })
  console.log("[sse] manager added: ", { manager })

  const successfullyCall = async () => {
    const res = await callChatGPT({
      modelId,
      // todo: context
      prompt: last(messages)!.content,
    })
    for await (const chunk of res) {
      // console.log("[llm] chunk: ", JSON.stringify(chunk))
      const token = chunk.content as string
      console.log("[llm] token: ", { requestId, token })
      r.data += token
      r.clients.forEach((c) => c.onEvent(token))
    }
    r.finished = true
  }

  if (["gpt-3.5-turbo", "gpt-4", "gpt-4-32k"].includes(modelId)) {
    // do not wait, o.w. frontend is blocked
    void successfullyCall()
    return true
  }
  // todo: more models
  return false
}
