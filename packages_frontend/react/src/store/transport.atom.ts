import { TransportType } from "@cs-magic/common/dist/transport/schema.js"
import { atom } from "jotai"

///////////////////////////////
// base
//////////////////////////////

export const transportTypeAtom = atom<TransportType>("pusher")
