import type { MessageParserContext } from "packages_wechaty/wechaty-puppet/src/mods/mod"
import type * as PUPPET from "packages_wechaty/wechaty-puppet/src/mods/mod"

import type { WebMessageRawPayload } from "src/web-schemas"
import { parseSysmsgMessagePayload } from "src/wechat4u/messages/message-sysmsg"
import type { PatMessagePayload } from "src/wechat4u/messages/sysmsg/message-pat"
import type { RevokeMsgMessagePayload } from "src/wechat4u/messages/sysmsg/message-revokemsg"
import type { TodoMessagePayload } from "src/wechat4u/messages/sysmsg/message-todo"

import type { MessageParser } from "src/wechat4u/schema-mapper/message/message-parser"

/**
 * try to parse talker and listenerId from sysmsg for room messages
 * @param padLocalMessage
 * @param ret
 * @param context
 */
export const sysmsgParser: MessageParser = async (
  webMessageRawPayload: WebMessageRawPayload,
  ret: PUPPET.payloads.Message,
  context: MessageParserContext,
) => {
  const sysmsgPayload = await parseSysmsgMessagePayload(webMessageRawPayload)
  if (!sysmsgPayload) {
    return ret
  }
  switch (sysmsgPayload.type) {
    case "pat": {
      const patMessagePayload: PatMessagePayload = sysmsgPayload.payload as PatMessagePayload

      if (context.isRoomMessage) {
        ret.talkerId = patMessagePayload.pattedUserName
        ret.listenerId = patMessagePayload.fromUserName
      }

      break
    }

    case "roomtoolstips": {
      const todoMessagePayload: TodoMessagePayload = sysmsgPayload.payload as TodoMessagePayload

      if (context.isRoomMessage) {
        ret.talkerId = todoMessagePayload.operatorUserName
      }

      break
    }

    case "revokemsg": {
      const revokeMsgPayload: RevokeMsgMessagePayload = sysmsgPayload.payload as RevokeMsgMessagePayload

      if (context.isRoomMessage) {
        // Generic room message logic can get the right talkerId for revoke message
      } else {
        // Fix talkerId for single chat revoke message that sent by you
        // talkerId and listenerId for revoke message sent by others is right already
        if (revokeMsgPayload.type === "You") {
          ret.listenerId = ret.talkerId
          ret.talkerId = context.puppet.currentUserId
        }
      }

      break
    }
    case "roomtips": {
      if (context.isRoomMessage) {
        ret.talkerId = webMessageRawPayload.FromUserName
      }

      break
    }
  }

  return ret
}
