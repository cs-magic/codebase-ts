import { EventType, IPusherServerConfig } from "@/lib/puser/schema"
import PusherJS from "pusher-js"
import { env } from "@/env"

export const initPusherClient = (
  config: IPusherServerConfig,
  options?: {
    onBeforeInit?: () => void
    onInit?: (client: PusherJS) => void
    onPing?: () => void
    onPong?: () => void
  },
) => {
  const { host: wsHost, port: wsPort, useTLS: forceTLS, cluster } = config

  if (options?.onBeforeInit) options.onBeforeInit()

  /**
   * 由于 pusher 的 ping 没有暴露给客户端
   * 而 ping 的时候一般是走额外的 transporter，而非基于 send_event
   * 所以我们只能在 log 里去 hook ping
   * @param message
   */
  PusherJS.log = (message: string) => {
    console.log({ message })
    const exists = (events: string[]) => events.some((s) => message.includes(s))

    if (exists(["pusher:ping", "initialized -> connecting"]) && options?.onPing)
      options.onPing()

    if (exists(["pusher:pong", "connecting -> connected"]) && options?.onPong)
      options.onPong()
  }

  if (options?.onPing) options.onPing()
  const pusherClient = new PusherJS(env.NEXT_PUBLIC_PUSHER_APP_KEY, {
    cluster,
    wsHost,
    wsPort,
    // When running the server in SSL mode, you may consider setting the forceTLS client option to true. When this option is set to true, the client will connect to the wss protocol instead of ws:
    forceTLS,
    disableStats: true,
    // Make sure that enabledTransports is set to ['ws', 'wss']. If not set, in case of connection failure, the client will try other transports such as XHR polling, which soketi doesn't support.
    enabledTransports: ["ws", "wss"],

    // 客户端检查服务器的间隔，默认30秒
    // activityTimeout: 3000,
  })

  if (options?.onInit) options.onInit(pusherClient)
  return pusherClient
}
// export const pusherClient = staticCreate(() => initPusherClient(pusherConfig))
