import { createHttpInstance } from "@/api/core"
import { env } from "@/env"
import logger from "@/log"

const baseURL = env?.NEXT_PUBLIC_BACKEND_URL
// logger.debug(`backend api baseURL: ${baseURL}`)
export const backendApi = createHttpInstance({
  baseURL,
})
