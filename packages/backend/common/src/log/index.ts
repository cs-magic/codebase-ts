import { pinoLogger } from "src/log/providers/pino"

// export const logger = pinoLogflareLogger
export const logger = pinoLogger

export * from "src/log/schema"

export default logger
