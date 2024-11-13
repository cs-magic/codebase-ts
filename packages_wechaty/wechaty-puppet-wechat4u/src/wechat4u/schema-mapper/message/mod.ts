import { referMsgParser } from "packages_wechaty/wechaty-puppet/src/mods/mod"

import { appMsgParser } from "src/wechat4u/schema-mapper/message/message-parser-appmsg"
import { roomParser } from "src/wechat4u/schema-mapper/message/message-parser-room"
import { singleChatParser } from "src/wechat4u/schema-mapper/message/message-parser-single-chat"
// import { referMsgParser } from './message-parser-refermsg.js'
import { sysmsgParser } from "src/wechat4u/schema-mapper/message/message-parser-sysmsg"
import { typeParser } from "src/wechat4u/schema-mapper/message/message-parser-type"
import { addMessageParser, executeMessageParsers } from "src/wechat4u/schema-mapper/message/message-parser"

// The order of message parser is important
addMessageParser(typeParser)
addMessageParser(roomParser)
addMessageParser(singleChatParser)
addMessageParser(appMsgParser)
addMessageParser(referMsgParser)
addMessageParser(sysmsgParser)

export { executeMessageParsers }
