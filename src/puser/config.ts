import Pusher from "pusher"
import PusherJS from "pusher-js"

export const PUSHER_APP_ID = "agi"
export const PUSHER_APP_KEY = "agi"
export const PUSHER_APP_SECRET = "agi"
export const PUSHER_CLUSTER = "0.0.0.0"
export const PUSHER_HOST = "socket.cs-magic.cn"
export const PUSHER_PORT: number | undefined = undefined

/**
 *
 * @param port https下不需要端口，设置为 undefined 即可
 * @param useTLS https下要使用 TLS
 */
export const initPusher = (port: number | undefined, useTLS: boolean) => {
  const pusherServer = new Pusher({
    host: PUSHER_HOST,
    port: port !== undefined ? port.toString() : port,
    useTLS,

    appId: PUSHER_APP_ID,
    key: PUSHER_APP_KEY,
    secret: PUSHER_APP_SECRET,
    cluster: PUSHER_CLUSTER,
  })

  const pusherClient = new PusherJS(PUSHER_APP_KEY, {
    wsHost: PUSHER_HOST,
    wsPort: PUSHER_PORT,

    // When running the server in SSL mode, you may consider setting the forceTLS client option to true. When this option is set to true, the client will connect to the wss protocol instead of ws:
    forceTLS: useTLS,

    disableStats: true,
    // Make sure that enabledTransports is set to ['ws', 'wss']. If not set, in case of connection failure, the client will try other transports such as XHR polling, which soketi doesn't support.
    enabledTransports: ["ws", "wss"],
    cluster: PUSHER_CLUSTER,
  })

  return { pusherServer, pusherClient }
}

export const { pusherServer, pusherClient } = initPusher(PUSHER_PORT, true)
