import { AppMessageType, ReferMsgPayload } from "src/extra/message"

export const serializeRefMsgPayload = (payload: ReferMsgPayload) => {
  // logger.debug("-- serializeRefMsgPayload: %o", payload)
  return `RefMsg(id=${payload.svrid}, type=${AppMessageType[Number(payload.type)]}, content=${payload.content})`
}
