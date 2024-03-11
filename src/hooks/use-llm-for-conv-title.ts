import { useSnapshot } from "valtio"
import { ILLMRequest } from "../schema/sse"
import { core } from "../store/core.valtio"
import { checkRespondingStatus } from "../utils"
import { useLlmPusher } from "./use-llm-pusher"
import { useLlmSse } from "./use-llm-sse"

export const useLLMForConvTitle = () => {
  const { conv } = useSnapshot(core)

  const llmRequest: ILLMRequest = {
    type: "conv-title",
    status: !conv ? "unknown" : checkRespondingStatus(conv.titleResponse),
    convId: conv?.id,
  }

  useLlmPusher(llmRequest, {
    update: (func) => {
      if (!conv) return
      core.updateConvTitle(conv.id, func)
    },
    autoClose: false, // 常驻后台
  })

  useLlmSse(llmRequest)
}
