"use server"

import { NextRequest } from "next/server"

import { streamManager } from "@/app/api/llm/init"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const conversationId = searchParams.get("c")
  console.log("[sse] get: ", { conversationId })
  return streamManager.read(conversationId, req)
}
