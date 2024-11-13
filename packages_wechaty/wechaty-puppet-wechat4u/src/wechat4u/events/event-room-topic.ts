import type * as PUPPET from "packages_wechaty/wechaty-puppet/src/mods/mod"

import { WebMessageRawPayload, WebMessageType } from "src/web-schemas"
import { isRoomId } from "src/wechat4u/utils/is-type"
import { parseTextWithRegexList } from "src/wechat4u/utils/regex"
import { executeRunners } from "src/wechat4u/utils/runner"

import type { EventPayload } from "src/wechat4u/events/event"

const OTHER_CHANGE_TOPIC_REGEX_LIST = [/^"(.+)"修改群名为“(.+)”$/, /^"(.+)" changed the group name to "(.+)"$/]
const YOU_CHANGE_TOPIC_REGEX_LIST = [/^(你)修改群名为“(.+)”$/, /^(You) changed the group name to "(.+)"$/]

type TopicChange = { changerId: string; newTopic: string }

export default async (puppet: PUPPET.Puppet, message: WebMessageRawPayload): Promise<EventPayload> => {
  const roomId = message.FromUserName
  if (!isRoomId(roomId)) {
    return null
  }

  /**
   * 1. Message payload "you change the room topic" is plain text with type 10000 : https://gist.github.com/padlocal/0c7bb4f5d51e7e94a0efa108bebb4645
   */
  const youChangeTopic = async () => {
    if (message.MsgType !== WebMessageType.SYS) {
      return null
    }

    return parseTextWithRegexList(message.Content, YOU_CHANGE_TOPIC_REGEX_LIST, async (_, match) => {
      const newTopic = match[2]

      return {
        changerId: puppet.currentUserId,
        newTopic,
      } as TopicChange
    })
  }

  /**
   * 2. Message payload "others change room topic" is xml text with type 10002: https://gist.github.com/padlocal/3480ada677839c8c11578d47e820e893
   */
  const otherChangeTopic = async () => {
    return parseTextWithRegexList(message.Content, OTHER_CHANGE_TOPIC_REGEX_LIST, async (_, match) => {
      const newTopic = match[2]
      const changeName = match[1]
      let changeId = ""
      if (changeName) {
        changeId = (await puppet.roomMemberSearch(roomId, changeName))[0]!
      }
      return {
        changerId: changeId,
        newTopic,
      } as TopicChange
    })
  }

  const topicChange = await executeRunners<TopicChange>([youChangeTopic, otherChangeTopic])
  if (topicChange) {
    const room = await puppet.roomPayload(roomId)
    const oldTopic = room.topic

    return {
      changerId: topicChange.changerId,
      newTopic: topicChange.newTopic,
      oldTopic,
      roomId,
      timestamp: message.CreateTime,
    } as PUPPET.payloads.EventRoomTopic
  }

  return null
}