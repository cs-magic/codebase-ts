import { createWechatyBot } from "@cs-magic/wechaty/create-wechaty-bot"
import { IContext } from "../schema/context"
import { syncClients } from "./sync-clients"
import { transferMessage } from "./transfer-message"

export const startBot = async (context: IContext): Promise<IContext> => {
  let { bot, scan, sockets } = context
  // 避免重复登录，会导致 padLocal 报错
  if (!bot) {
    console.log("-- creating bot")
    bot = createWechatyBot({
      name: "1", // todo
    })
      .on("scan", (value, status) => {
        scan = { value, status }
        transferMessage({ type: "scan", data: scan }, sockets)
      })
      .on("login", (user) => {
        // console.log("-- login: ", user)
        scan = null
        syncClients({ bot, scan, sockets })
      })
  }
  if (!bot.isLoggedIn) {
    console.log("-- starting bot")
    await bot.start()
  }
  return { bot, scan, sockets }
}
