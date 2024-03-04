import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { type NextRequest } from "next/server"
import { appRouter } from "@/api/__root"

import { createTRPCContext } from "../../../../../packages/common/lib/trpc/context"
import { isDev } from "../../../../../packages/common/lib/utils"

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async (req: NextRequest) => {
  return createTRPCContext({
    headers: req.headers,
  })
}

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError: isDev
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
          )
        }
      : undefined,
  })

export { handler as GET, handler as POST }
