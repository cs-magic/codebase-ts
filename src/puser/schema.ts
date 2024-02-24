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
export type EventCallback<T extends EventType> = (v: EventData<T>) => any
