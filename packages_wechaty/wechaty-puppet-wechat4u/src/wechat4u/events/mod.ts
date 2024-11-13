import friendShipParser from "src/wechat4u/events/event-friendship"
import messageParser from "src/wechat4u/events/event-message"
import roomInviteParser from "src/wechat4u/events/event-room-invite"
import roomJoinParser from "src/wechat4u/events/event-room-join"
import roomLeaveParser from "src/wechat4u/events/event-room-leave"
import roomTopicParser from "src/wechat4u/events/event-room-topic"
import { EventType, addEventParser, parseEvent } from "src/wechat4u/events/event"

addEventParser(EventType.Friendship, friendShipParser)
addEventParser(EventType.RoomInvite, roomInviteParser)
addEventParser(EventType.RoomJoin, roomJoinParser)
addEventParser(EventType.RoomLeave, roomLeaveParser)
addEventParser(EventType.RoomTopic, roomTopicParser)
addEventParser(EventType.Message, messageParser)

export { parseEvent, EventType }
