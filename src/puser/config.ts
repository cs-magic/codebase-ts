import Pusher from "pusher"
import PusherJS from "pusher-js"

export const PUSHER_APP_ID = "agi"
export const PUSHER_APP_KEY = "agi"
export const PUSHER_APP_SECRET = "agi"
export const PUSHER_CLUSTER = "0.0.0.0"
export const PUSHER_HOST = "socket.cs-magic.cn"
/**
 * todo: how to without port ?
 */
export const PUSHER_PORT = 6001

export const pusherServer = new Pusher({
  appId: PUSHER_APP_ID,
  key: PUSHER_APP_KEY,
  secret: PUSHER_APP_SECRET,
  cluster: PUSHER_CLUSTER,

  host: PUSHER_HOST,
  port: PUSHER_PORT.toString(),
})

export const pusherClient = new PusherJS(PUSHER_APP_KEY, {
  wsHost: PUSHER_HOST,
  wsPort: PUSHER_PORT,
  // When running the server in SSL mode, you may consider setting the forceTLS client option to true. When this option is set to true, the client will connect to the wss protocol instead of ws:
  forceTLS: false,
  disableStats: true,
  // Make sure that enabledTransports is set to ['ws', 'wss']. If not set, in case of connection failure, the client will try other transports such as XHR polling, which soketi doesn't support.
  enabledTransports: ["ws", "wss"],
  cluster: PUSHER_CLUSTER,
})

export type EventType = "onNotification" | "onUserMessage"
export type OnNotificationData = {
  userId: string
  content: string
}
export type OnUserMessageData = {
  fromUserId: string
  channelId: string
  content: string
}
export type EventData<T extends EventType> = T extends "onNotification"
  ? OnNotificationData
  : OnUserMessageData

export const pusherSend = async <T extends EventType>(
  channel: string,
  eventType: T,
  data: EventData<T>,
) => {
  console.log("[socket-server] sending: ", { eventType, data })
  await pusherServer.trigger(channel, eventType, data)
}
