"use server"

/**
 * ref: https://js.langchain.com/docs/modules/model_io/chat/streaming
 */

import { ChatOpenAI } from "@langchain/openai"
import { OpenAIModelType } from "@/schema/llm"

export const callChatGPT = async ({
  prompt,
  modelName,
  temperature = 0.9,
}: {
  prompt: string
  modelName: OpenAIModelType
  temperature?: number
}) => {
  const model = new ChatOpenAI({
    modelName, // Defaults to "gpt-3.5-turbo-instruct" if no model provided.
    temperature,
  })
  return model.stream(prompt)
}
