"use server"

import { ICreateConversationBody } from "@/schema/api"
import { v4 } from "uuid"
import { streamManager } from "@/app/api/llm/init"

export const triggerLLM = async (body: ICreateConversationBody) => {
  const { conversationId = v4() } = body
  const data = { ...body, conversationId }
  console.log("[sse] post: ", data)
  void streamManager.trigger(data)
  return { conversationId }
}
