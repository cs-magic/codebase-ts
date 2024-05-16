import { formatError } from "@cs-magic/common/utils/format-error"
import { logger } from "@cs-magic/log/logger"
import qrcodeTerminal from "qrcode-terminal"
import { ScanStatus, Wechaty } from "wechaty"
import { initBotContext } from "../schema/bot.context"
import { handleFriendship } from "./handle-friendship"
import { handleMessage } from "./handle-message"
import { handleRoomInvite } from "./handle-room-invite"
import { handleRoomJoin } from "./handle-room-join"

export const safeHandle = async (p: Promise<unknown>) => {
  try {
    return await p
  } catch (e) {
    formatError(e)
  }
}

export const handleWechatyBot = (bot: Wechaty) => {
  bot
    //////////////////////////////
    // basic
    //////////////////////////////

    .on("scan", async (qrcode, status, data) => {
      logger.info(
        `onScan (status=${ScanStatus[status]}, data=${data}), scan the following qrcode or from wechaty official: https://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`,
      )
      qrcodeTerminal.generate(qrcode, { small: true })
    })

    .on("login", async (user) => {
      logger.info(`onLogin: %o`, user.payload)
      bot.context = await initBotContext(bot)
    })

    .on("logout", (user, reason) => {
      logger.info(`-- User logged out: %o, reason: ${reason}`, user.payload)
    })

    .on("error", async (err) => {
      // 只要handle 一次
      formatError(err)
    })

    //////////////////////////////
    // social
    //////////////////////////////

    .on("message", async (message) => {
      await safeHandle(handleMessage(bot, message))
    })

    .on("friendship", async (friendship) => {
      await safeHandle(handleFriendship(bot, friendship))
    })

    .on("room-invite", async (room) => {
      await safeHandle(handleRoomInvite(bot, room))
    })

    .on("room-join", async (...args) => {
      await safeHandle(handleRoomJoin(bot, ...args))
    })

    .on("post", (post) => {
      logger.info(`onPost: %o`, post)
    })

    //////////////////////////////
    // utils
    //////////////////////////////

    .on("dong", (data) => {
      logger.info(`onDong: %o`, data)
    })

    .on("heartbeat", (data) => {
      // 比较频繁，大概一分钟一次这样子
      // logger.debug(`onHeartbeat: %o`, data)
      logger.debug(".")
    })

    .on("puppet", async (puppet) => {
      logger.debug(`onPuppet`)
      // 不要打印它，太长了；也不要存储，因为自循环
      // logger.debug(puppet)
    })

    .on("ready", () => {
      logger.info(`onReady`)
    })

    .on("start", () => {
      logger.info(`onStart`)
    })

    .on("stop", () => {
      logger.info(`onStop`)
    })
}
