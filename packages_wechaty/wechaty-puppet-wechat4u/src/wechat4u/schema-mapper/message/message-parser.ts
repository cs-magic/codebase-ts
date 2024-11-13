import type { GenericMessageParser, MessageParserContext } from "packages_wechaty/wechaty-puppet/src/mods/mod"
import type * as PUPPET from "packages_wechaty/wechaty-puppet/src/mods/mod"

import type { WebMessageRawPayload } from "src/web-schemas"

export type MessageParser = GenericMessageParser<WebMessageRawPayload>

const messageParserList: Array<MessageParser> = []

export function addMessageParser(parser: MessageParser) {
  messageParserList.push(parser)
}

export async function executeMessageParsers(
  puppet: PUPPET.Puppet,
  webMessageRawPayload: WebMessageRawPayload,
  ret: PUPPET.payloads.Message,
): Promise<PUPPET.payloads.Message> {
  const context: MessageParserContext = {
    isRoomMessage: false,
    puppet,
  }

  let i = 0
  for (const parser of messageParserList) {
    // @ts-ignore
    ++i
    // logger.info(`parser[${i}/${messageParserList.length}]`)
    ret = await parser(webMessageRawPayload, ret, context)
  }

  return ret
}

export const LOGPRE = "message-parser"
