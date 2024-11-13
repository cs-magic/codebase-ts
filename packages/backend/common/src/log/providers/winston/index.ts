import winston from "winston"

import { consoleTransport } from "src/log/providers/winston/transports/console"
import { fileRotateTransport } from "src/log/providers/winston/transports/rotate-file"

export const winstonLogger = winston.createLogger({
  level: "info",
  transports: [consoleTransport, fileRotateTransport],
})
