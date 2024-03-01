import { NextRequest } from "next/server"
import { manager } from "@/app/api/llm/init"

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
