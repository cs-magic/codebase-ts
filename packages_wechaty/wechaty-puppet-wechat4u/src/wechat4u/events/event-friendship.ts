import * as PUPPET from "packages_wechaty/wechaty-puppet/src/mods/mod"

import { WebMessageRawPayload, WebMessageType } from "src/web-schemas"
import { isContactId } from "src/wechat4u/utils/is-type"
import { xmlToJson } from "src/wechat4u/utils/xml-to-json"

import type { EventPayload } from "src/wechat4u/events/event"

const FRIENDSHIP_CONFIRM_REGEX_LIST = [
  /^You have added (.+) as your WeChat contact. Start chatting!$/,
  /^你已添加了(.+)，现在可以开始聊天了。$/,
  /I've accepted your friend request. Now let's chat!$/,
  /^(.+) just added you to his\/her contacts list. Send a message to him\/her now!$/,
  /^(.+)刚刚把你添加到通讯录，现在可以开始聊天了。$/,
  /^我通过了你的朋友验证请求，现在我们可以开始聊天了$/,
]

const FRIENDSHIP_VERIFY_REGEX_LIST = [
  /^(.+) has enabled Friend Confirmation/,
  /^(.+)开启了朋友验证，你还不是他（她）朋友。请先发送朋友验证请求，对方验证通过后，才能聊天。/,
]

interface ReceiveXmlSchema {
  msg: {
    $: {
      fromusername: string
      encryptusername: string
      content: string
      scene: string
      ticket: string
      sourcenickname?: string
      sourceusername?: string
      sharecardnickname?: string
      sharecardusername?: string
    }
  }
}

const isConfirm = (message: WebMessageRawPayload): boolean => {
  return FRIENDSHIP_CONFIRM_REGEX_LIST.some((regexp) => {
    return !!message.Content.match(regexp)
  })
}

const isNeedVerify = (message: WebMessageRawPayload): boolean => {
  return FRIENDSHIP_VERIFY_REGEX_LIST.some((regexp) => {
    return !!message.Content.match(regexp)
  })
}

const isReceive = async (message: WebMessageRawPayload): Promise<ReceiveXmlSchema | null> => {
  if (message.MsgType !== WebMessageType.VERIFYMSG) {
    return null
  }

  try {
    const verifyXml: ReceiveXmlSchema = await xmlToJson(message.Content)
    const contactId = verifyXml.msg.$.fromusername
    if (isContactId(contactId) && verifyXml.msg.$.encryptusername) {
      return verifyXml
    }
  } catch (e) {
    // not receive event
  }

  return null
}

export default async (_puppet: PUPPET.Puppet, message: WebMessageRawPayload): Promise<EventPayload> => {
  if (isConfirm(message)) {
    return {
      contactId: message.FromUserName,
      id: message.MsgId,
      timestamp: message.CreateTime,
      type: PUPPET.types.Friendship.Confirm,
    } as PUPPET.payloads.FriendshipConfirm
  } else if (isNeedVerify(message)) {
    return {
      contactId: message.FromUserName,
      id: message.MsgId,
      timestamp: message.CreateTime,
      type: PUPPET.types.Friendship.Verify,
    } as PUPPET.payloads.FriendshipVerify
  } else {
    const verifyXml = await isReceive(message)
    if (verifyXml) {
      return {
        contactId: verifyXml.msg.$.fromusername,
        hello: verifyXml.msg.$.content,
        id: message.MsgId,
        scene: parseInt(verifyXml.msg.$.scene, 10),
        shareCardContactId: verifyXml.msg.$.sharecardusername,
        shareCardNickName: verifyXml.msg.$.sharecardnickname,
        sourceContactId: verifyXml.msg.$.sourceusername,
        sourceNickName: verifyXml.msg.$.sourcenickname,
        stranger: verifyXml.msg.$.encryptusername,
        ticket: verifyXml.msg.$.ticket,
        timestamp: message.CreateTime,
        type: PUPPET.types.Friendship.Receive,
      } as PUPPET.payloads.FriendshipReceive
    }

    return null
  }
}
