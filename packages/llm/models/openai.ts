"use server"

/**
 * ref: https://js.langchain.com/docs/modules/model_io/chat/streaming
 */

import { ILLMMessage } from "@/schema/message"
import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages"
import { ChatOpenAI } from "@langchain/openai"
import { ICreateCallLLM } from "../schema"

/**
 * todo: 用更好的接口，langchain 这个不太对齐（但兼容性应该是最好的）
 */
export const callChatGPT = async ({
  config,
  context,
}: {
  config: ICreateCallLLM
  context: ILLMMessage[]
}) => {
  const model = new ChatOpenAI({
    ...config,
  })
  return model.stream(
    context.map((m) => {
      // ref: https://js.langchain.com/docs/modules/model_io/chat/quick_start#messages
      const Message =
        m.role === "system"
          ? SystemMessage
          : m.role === "user"
            ? HumanMessage
            : AIMessage
      return new Message(m.content)
    }),
  )
}
