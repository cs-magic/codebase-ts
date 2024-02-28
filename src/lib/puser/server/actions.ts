"use server"

import { EventData, EventType } from "@/lib/puser/schema"
import { initPusherServer } from "./init"
import { pusherServerConfigs, PusherServerId } from "@/lib/puser/config"

export const pusherSend = async <T extends EventType>(
  serverId: PusherServerId,
  channel: string,
  eventType: T,
  data: EventData<T>,
) => {
  console.log("[socket-server] sending: ", { eventType, data })
  await initPusherServer(pusherServerConfigs[serverId]).trigger(
    channel,
    eventType,
    data,
  )
}
