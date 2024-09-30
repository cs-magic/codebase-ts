import pino from "pino"
import { logflarePinoVercel } from "pino-logflare"

// create pino-logflare console stream for serverless functions and send function for browser logs
// Browser logs are going to: https://logflare.app/sources/13989
// Vercel log drain was setup to send logs here: https://logflare.app/sources/13830
const { stream, send } = logflarePinoVercel({
  apiKey: "vVlsKT-3Luqw",
  sourceToken: "eb2b3767-bc24-4d48-b756-b4a980ec0fd3",
})

// create pino logger
const log = pino(
  {
    // timestamp: pino.stdTimeFunctions.isoTime,
    transport: {
      target: "pino-pretty",
      // ref: https://github.com/pinojs/pino-pretty#cli-arguments
      options: {
        colorize: true,
        translateTime: "SYS:standard", // 'SYS:yyyy-mm-dd HH:MM:ss', //yyyy-mm-dd HH:MM:ss',
      },
    },
    browser: {
      transmit: {
        level: "info",
        send,
      },
    },
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    base: {
      // env: process.env.NODE_ENV, // 会打印成 {foo: bar} 样子
      // revision: process.env.VERCEL_GITHUB_COMMIT_SHA,
    },
  },
  stream,
)

export default typeof window === "undefined" ? log : log
