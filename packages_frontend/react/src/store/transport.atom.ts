import { TransportType } from "@cs-magic/common/dist/transport/schema"
import { atom } from "jotai"

///////////////////////////////
// base
//////////////////////////////

export const transportTypeAtom = atom<TransportType>("pusher")
