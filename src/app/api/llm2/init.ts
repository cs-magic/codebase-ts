import { EventsManager } from "@/server/events-manager"

// const streamManager = staticCreate(() => new EventsManager())
export const streamManager = new EventsManager()
