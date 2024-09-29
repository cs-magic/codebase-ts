import { atom } from "jotai";

import { TransportType } from "@cs-magic/common/transport/schema";

///////////////////////////////
// base
//////////////////////////////

export const transportTypeAtom = atom<TransportType>("pusher");
