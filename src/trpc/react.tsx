"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {
  createWSClient,
  httpBatchLink,
  loggerLink,
  TRPCLink,
  unstable_httpBatchStreamLink,
  wsLink,
} from "@trpc/client"
import { createTRPCReact } from "@trpc/react-query"
import { useState } from "react"

import { type AppRouter } from "@/server/api/root"
import { getUrl, transformer } from "./shared"

import { APP_URL, WS_URL } from "@/config/system"
import { NextPageContext } from "next"

const createQueryClient = () => new QueryClient()

let clientQueryClientSingleton: QueryClient | undefined = undefined
const getQueryClient = () => {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return createQueryClient()
  }
  // Browser: use singleton pattern to keep the same query client
  return (clientQueryClientSingleton ??= createQueryClient())
}

export const api = createTRPCReact<AppRouter>()

function getEndingLink(ctx: NextPageContext | undefined): TRPCLink<AppRouter> {
  if (typeof window === "undefined") {
    return httpBatchLink({
      url: `${APP_URL}/api/trpc`,
      headers() {
        if (!ctx?.req?.headers) {
          return {}
        }
        // on ssr, forward client's headers to the server
        return {
          ...ctx.req.headers,
          "x-ssr": "1",
        }
      },
    })
  }
  const client = createWSClient({
    url: WS_URL,
    retryDelayMs: (ctx) => 3000,
  })
  return wsLink({
    client,
  })
}

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  const [trpcClient] = useState(() =>
    api.createClient({
      transformer,

      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),

        unstable_httpBatchStreamLink({
          url: getUrl(),
        }),

        getEndingLink(undefined),
        // wsLink({
        //   client: wsClient,
        // }),
        // call subscriptions through websockets and the rest over http
      ],
    }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  )
}
