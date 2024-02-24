import {
  applyWSSHandler,
  CreateWSSContextFnOptions,
} from "@trpc/server/adapters/ws"
import { WebSocketServer } from "ws"
import { appRouter } from "./api/root"
import { headers } from "next/headers"
import { createTRPCContext } from "@/server/api/context"

const createWssContext = (opts: CreateWSSContextFnOptions) => {
  const heads = new Headers(headers())
  // heads.set("x-trpc-source", "rsc")
  const wssHeaders = opts.req.headers
  console.log("\n\n=====\n====\n", { heads, wssHeaders }, "\n\n====\n")

  return createTRPCContext({
    headers: {
      ...heads,
      ...wssHeaders,
    },
  })
}

const wss = new WebSocketServer({
  port: 3001,
})
const handler = applyWSSHandler({
  wss,
  router: appRouter,
  createContext: createWssContext,
})

wss.on("connection", (ws) => {
  console.log(`➕➕ Connection (${wss.clients.size})`)
  ws.once("close", () => {
    console.log(`➖➖ Connection (${wss.clients.size})`)
  })
})
console.log("✅ WebSocket Server listening on ws://localhost:3001")

process.on("SIGTERM", () => {
  console.log("SIGTERM")
  handler.broadcastReconnectNotification()
  wss.close()
})
