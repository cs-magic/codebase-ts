import { Channel } from "pusher-js"
import { useEffect } from "react"
import { pusherClient } from "@/puser/config"
import { EventCallback, EventType } from "@/puser/schema"

import "colors"
import c from "ansi-colors"

let n = 0
export const useBindPusherEvent = <T extends EventType>(
  type: T,
  f: EventCallback<T>,
  options?: { channel?: Channel; enabled?: boolean },
) => {
  const target = options?.channel ?? pusherClient
  const enabled = options?.enabled !== false

  const call: EventCallback<T> = (data) => {
    ++n
    console.log(c.bgBlueBright.black.bold(` >> #${n} ${type} `), data)
    const result = f(data)
    console.log(c.bgMagenta.whiteBright.bold(` << #${n} ${type} `), result)
    return result
  }

  useEffect(() => {
    if (!enabled) return

    target.bind(type, call)

    return () => {
      target.unbind(type, call)
    }
  }, [options])

  return { enabled, target }
}
