import logger from "@cs-magic/common/dist/log/index.js";
import { formatAction } from "@cs-magic/common/dist/utils/format-action.js";
import { formatError } from "@cs-magic/common/dist/utils/format-error.js";

import { createWechatyBot } from "../../bot/index.js";
import { IContext } from "../schema.js";

import { syncClients } from "./sync-clients.js";
import { transferMessage } from "./transfer-message.js";

// process.on("uncaughtException", (error) => {
//   logger.error("Uncaught Exception:", error)
//   // 可以在这里执行一些清理操作
// })
//
// // todo: research on: PrismaClientInitializationError: Prisma Client could not locate the Query Engine for runtime "darwin".
// process.on("unhandledRejection", (reason, promise) => {
//   logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason as unknown as string}`)
//   // 可以在这里执行一些清理操作
// })

export const startBot = async (context: IContext) => {
  // 避免重复登录，会导致 padLocal 报错
  if (!context.bot) {
    // logger.info(context)
    // const bot = await formatAction(createWechatyBot, "creating bot")
    const bot = createWechatyBot();

    bot
      .on("scan", (value, status) => {
        context.scan = { value, status };
        logger.info(`updated scan: ${JSON.stringify(context.scan)}`);
        transferMessage({ type: "scan", data: context.scan }, context.sockets);
      })
      .on("login", (user) => {
        // console.log("-- login: ", user)
        context.scan = null;
        syncClients(context);
      });
    context.bot = bot;

    // todo: if has cache,  start auto, o.w. wait for triggering in the frontend ?
    if (!context.bot.isLoggedIn) {
      // logger.info(context)
      // await formatAction(context.bot.start, "starting bot")
      try {
        logger.info("starting bot");
        await context.bot.start();
        logger.info("started bot");
      } catch (e) {
        logger.error("error starting");
        formatError(e);
        throw e;
      }
    }
  }
};
