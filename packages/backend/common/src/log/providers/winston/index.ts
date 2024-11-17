import winston from "winston"

import { consoleTransport } from "@/log/providers/winston/transports/console"
import { fileRotateTransport } from "@/log/providers/winston/transports/rotate-file"

export const winstonLogger = winston.createLogger({
  level: "info",
  transports: [consoleTransport, fileRotateTransport],
})
