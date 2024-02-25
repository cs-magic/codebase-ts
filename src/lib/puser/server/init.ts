import { pusherConfig } from "@/lib/puser/config"
import { IPusherServerConfig } from "@/lib/puser/schema"
import Pusher from "pusher"
import { env } from "@/env"

export const initPusherServer = (config: IPusherServerConfig) => {
  const { port, useTLS, cluster, host } = config

  return new Pusher({
    host,
    port: port !== undefined ? port.toString() : port,
    useTLS,
    cluster,

    appId: env.PUSHER_APP_ID,
    key: env.NEXT_PUBLIC_PUSHER_APP_KEY,
    secret: env.PUSHER_APP_SECRET,
  })
}
export const pusherServer = initPusherServer(pusherConfig)