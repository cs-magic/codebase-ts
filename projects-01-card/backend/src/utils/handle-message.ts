import { formatError } from "@cs-magic/common/utils/format-error"
import { logger } from "@cs-magic/log/logger"
import { parseLimitedCommand } from "@cs-magic/wechaty/utils/parse-command"
import { BotCommandType, botCommandTypeSchema } from "../config"
import { IContext } from "../schema/context"
import { startBot } from "./start-bot"
import { syncClients } from "./sync-clients"

export const handleMessage = async (
  context: IContext,
  messageBuffer: Buffer,
): Promise<IContext> => {
  try {
    const message = messageBuffer.toString()

    const result = parseLimitedCommand<BotCommandType>(
      messageBuffer.toString(),
      botCommandTypeSchema,
    )

    logger.debug({ message, result })

    if (!result) return context

    switch (result.command) {
      case "start":
        context = await startBot(context)
        break

      case "stop":
        await context.bot?.stop()
        syncClients(context)
        break

      case "logout":
        await context.bot?.logout()
        syncClients(context)
        break

      default:
        break
    }

    logger.debug(`✅ ${result.command} ${result.args}`)
  } catch (e) {
    formatError(e)
  }

  return context
}