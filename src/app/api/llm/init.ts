import { staticCreate } from "@/lib/utils"
import { EventsManager } from "@/server/events-manager"

export const streamManager = staticCreate(() => new EventsManager())
// export const streamManager = new EventsManager()
