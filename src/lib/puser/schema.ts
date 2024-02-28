export type EventType = "onNotification" | "onUserMessage" | "ping"
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
export type EventCallback<T extends EventType> = (v: EventData<T>) => any

/**
 * config
 */

export interface IPusherServerConfig {
  host: string
  port?: number
  useTLS: boolean
  cluster: string
}
