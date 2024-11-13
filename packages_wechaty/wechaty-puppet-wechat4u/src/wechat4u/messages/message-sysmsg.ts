import { WebMessageRawPayload, WebMessageType } from "src/web-schemas"
import { xmlToJson } from "src/wechat4u/utils/xml-to-json"

import type { PatMessagePayload, PatXmlSchema } from "src/wechat4u/messages/sysmsg/message-pat"
import { parsePatMessagePayload } from "src/wechat4u/messages/sysmsg/message-pat"
import type { RevokeMsgMessagePayload, RevokeMsgXmlSchema } from "src/wechat4u/messages/sysmsg/message-revokemsg"
import { parseRevokeMsgMessagePayload } from "src/wechat4u/messages/sysmsg/message-revokemsg"
import type { SysmsgTemplateMessagePayload, SysmsgTemplateXmlSchema } from "src/wechat4u/messages/sysmsg/message-sysmsgtemplate"
import { parseSysmsgTemplateMessagePayload } from "src/wechat4u/messages/sysmsg/message-sysmsgtemplate"
import type { TodoMessagePayload, TodoXmlSchema } from "src/wechat4u/messages/sysmsg/message-todo"
import { parseTodoMessagePayload } from "src/wechat4u/messages/sysmsg/message-todo"

interface SysmsgXmlSchema {
  sysmsg: {
    $: {
      type: string
    }
    pat?: PatXmlSchema
    sysmsgtemplate?: SysmsgTemplateXmlSchema
    todo?: TodoXmlSchema
    revokemsg?: RevokeMsgXmlSchema
  }
}

export interface RoomTipsPayload {
  content: string
}

type SysMsgType = "pat" | "sysmsgtemplate" | "roomtoolstips" | "revokemsg" | "roomtips"
type SysMsgPayload =
  | PatMessagePayload
  | SysmsgTemplateMessagePayload
  | TodoMessagePayload
  | RevokeMsgMessagePayload
  | RoomTipsPayload

export interface SysmsgMessagePayload {
  type: SysMsgType
  payload: SysMsgPayload
}

export async function parseSysmsgMessagePayload(message: WebMessageRawPayload): Promise<SysmsgMessagePayload | null> {
  if (![WebMessageType.SYS, WebMessageType.RECALLED].includes(message.MsgType)) {
    return null
  }

  const content = message.Content.trim()
  const sysmsgIndex = content.indexOf("<sysmsg")
  if (sysmsgIndex === -1) {
    return {
      payload: { content },
      type: "roomtips",
    }
  }

  const sysmsgXml: SysmsgXmlSchema = await xmlToJson(content.substring(sysmsgIndex))

  let payload: SysMsgPayload | undefined
  switch (sysmsgXml.sysmsg.$.type) {
    case "pat":
      payload = await parsePatMessagePayload(sysmsgXml.sysmsg.pat!)
      break
    case "sysmsgtemplate":
      payload = await parseSysmsgTemplateMessagePayload(sysmsgXml.sysmsg.sysmsgtemplate!)
      break
    case "roomtoolstips":
      payload = await parseTodoMessagePayload(sysmsgXml.sysmsg.todo!)
      break
    case "revokemsg":
      payload = await parseRevokeMsgMessagePayload(sysmsgXml.sysmsg.revokemsg!)
      break
  }

  if (payload) {
    return {
      payload,
      type: sysmsgXml.sysmsg.$.type as SysMsgType,
    }
  } else {
    return null
  }
}

export async function parseSysmsgPatMessagePayload(message: WebMessageRawPayload): Promise<PatMessagePayload | null> {
  const sysmsgPayload = await parseSysmsgMessagePayload(message)
  if (!sysmsgPayload || sysmsgPayload.type !== "pat") {
    return null
  }

  return sysmsgPayload.payload as PatMessagePayload
}

export async function parseSysmsgSysmsgTemplateMessagePayload(
  message: WebMessageRawPayload,
): Promise<SysmsgTemplateMessagePayload | null> {
  const sysmsgPayload = await parseSysmsgMessagePayload(message)
  if (!sysmsgPayload || sysmsgPayload.type !== "sysmsgtemplate") {
    return null
  }

  return sysmsgPayload.payload as SysmsgTemplateMessagePayload
}

export async function parseSysmsgTodoMessagePayload(message: WebMessageRawPayload): Promise<TodoMessagePayload | null> {
  const sysmsgPayload = await parseSysmsgMessagePayload(message)
  if (!sysmsgPayload || sysmsgPayload.type !== "roomtoolstips") {
    return null
  }

  return sysmsgPayload.payload as TodoMessagePayload
}

export async function parseSysmsgRevokeMsgMessagePayload(
  message: WebMessageRawPayload,
): Promise<RevokeMsgMessagePayload | null> {
  const sysmsgPayload = await parseSysmsgMessagePayload(message)
  if (!sysmsgPayload || sysmsgPayload.type !== "revokemsg") {
    return null
  }

  return sysmsgPayload.payload as RevokeMsgMessagePayload
}
