import type { TransportType } from "@cs-magic/common/transport/schema"
import { atom } from "jotai"


///////////////////////////////
// base
//////////////////////////////

export const transportTypeAtom = atom<TransportType>("pusher")
