import type { MessageParserContext } from "packages_wechaty/wechaty-puppet/src/mods/mod"
import type * as PUPPET from "packages_wechaty/wechaty-puppet/src/mods/mod"

import type { WebMessageRawPayload } from "src/web-schemas"

import type { MessageParser } from "src/wechat4u/schema-mapper/message/message-parser"

export const singleChatParser: MessageParser = async (
  webMessageRawPayload: WebMessageRawPayload,
  ret: PUPPET.payloads.Message,
  context: MessageParserContext,
) => {
  if (!context.isRoomMessage) {
    ret.talkerId = webMessageRawPayload.FromUserName
    ret.listenerId = webMessageRawPayload.ToUserName
  }

  return ret
}
