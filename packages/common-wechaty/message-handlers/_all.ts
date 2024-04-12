import { BasicCommandsMessageHandler } from "./basic-commands"
import { StorageMessageHandler } from "./storage"
import { UniChatterMessageHandler } from "./uni-chatter"
import { UniParserMessageHandler } from "./uni-parser"
import { ValidatorMessageHandler } from "./validator"

export const MessageHandlerMap = {
  commands: BasicCommandsMessageHandler,
  "uni-chatter": UniChatterMessageHandler,
  "uni-parser": UniParserMessageHandler,
  storage: StorageMessageHandler,
  validator: ValidatorMessageHandler,
}
