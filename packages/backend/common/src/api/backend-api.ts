import { env } from "src/env"
import logger from "src/log"

import { createHttpInstance } from "src/api/core"

const baseURL = env?.NEXT_PUBLIC_BACKEND_URL
// logger.debug(`backend api baseURL: ${baseURL}`)
export const backendApi = createHttpInstance({
  baseURL,
})
