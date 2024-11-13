import type * as PUPPET from "packages_wechaty/wechaty-puppet/src/mods/mod"

import type { WebMessageRawPayload } from "src/web-schemas"

import type { EventPayload } from "src/wechat4u/events/event"

export default async (_puppet: PUPPET.Puppet, message: WebMessageRawPayload): Promise<EventPayload> => {
  return message
}
