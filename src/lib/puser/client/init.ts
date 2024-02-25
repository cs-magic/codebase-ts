import { IPusherServerConfig } from "@/lib/puser/schema"
import PusherJS from "pusher-js"
import { env } from "@/env"
import { pusherConfig } from "@/lib/puser/config"

export const initPusherClient = (config: IPusherServerConfig) => {
  const { host: wsHost, port: wsPort, useTLS: forceTLS, cluster } = config
  return new PusherJS(env.NEXT_PUBLIC_PUSHER_APP_KEY, {
    cluster,
    wsHost,
    wsPort,
    // When running the server in SSL mode, you may consider setting the forceTLS client option to true. When this option is set to true, the client will connect to the wss protocol instead of ws:
    forceTLS,
    disableStats: true,
    // Make sure that enabledTransports is set to ['ws', 'wss']. If not set, in case of connection failure, the client will try other transports such as XHR polling, which soketi doesn't support.
    enabledTransports: ["ws", "wss"],
  })
}
export const pusherClient = initPusherClient(pusherConfig)
