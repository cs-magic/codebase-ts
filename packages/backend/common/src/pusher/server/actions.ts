import { pusherServerConfigs } from "src/pusher/config"
import type { PusherEventData, PusherEventType, PusherServerId } from "src/pusher/schema"

import { initPusherServer } from "src/pusher/server/init"

export const pusherSend = async <T extends PusherEventType>(
  serverId: PusherServerId,
  channel: string,
  eventType: T,
  data: PusherEventData<T>,
) => {
  console.log("[socket-server] sending: ", { eventType, data })
  await initPusherServer(pusherServerConfigs[serverId]).trigger(channel, eventType, data)
}
