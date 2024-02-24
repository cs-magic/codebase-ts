import { NextRequest, NextResponse } from "next/server"
import { v4 } from "uuid"
import { EventsManager } from "@/server/events-manager"
import { ICreateConversationBody, IPostLlmRes } from "@/schema/api"

const streamManager = new EventsManager()

export async function POST(req: Request): Promise<NextResponse<IPostLlmRes>> {
  const body = (await req.json()) as ICreateConversationBody
  const conversationId = v4()
  const data = { ...body, conversationId }
  void streamManager.trigger(data)
  console.log("[sse] post: ", data)
  return NextResponse.json({ conversationId })
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const cid = searchParams.get("c")
  console.log("[sse] get: ", { cid })
  return streamManager.read(cid, req)
}
