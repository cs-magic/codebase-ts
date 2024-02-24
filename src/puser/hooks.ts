import { Channel } from "pusher-js"
import { useEffect } from "react"
import { EventType, EventData, pusherClient } from "@/puser/config"

export const useBindPusherEvent = <T extends EventType>(
  eventType: T,
  f: (v: EventData<T>) => void,
  options?: { channel?: Channel },
) => {
  const obj = options?.channel ?? pusherClient

  useEffect(() => {
    obj.bind(eventType, f)

    return () => {
      obj.unbind(eventType, f)
    }
  }, [options?.channel])
}
