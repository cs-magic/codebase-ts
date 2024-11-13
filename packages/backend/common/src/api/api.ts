import type { AxiosInstance } from "axios"

import { createHttpInstance } from "src/api/core"

export const api: AxiosInstance = createHttpInstance()
