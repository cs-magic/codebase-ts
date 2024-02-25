"use server"

import { EventData, EventType } from "@/lib/puser/schema"
import { pusherServer } from "./init"

export const pusherSend = async <T extends EventType>(
  channel: string,
  eventType: T,
  data: EventData<T>,
) => {
  console.log("[socket-server] sending: ", { eventType, data })
  await pusherServer.trigger(channel, eventType, data)
}
