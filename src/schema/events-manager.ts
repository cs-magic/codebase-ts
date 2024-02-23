import { IEvent } from "@/schema/api"

export type IEventsManager = {
  events: IEvent[]
  endpoints: IEndpoint[]
}

export interface IEndpoint {
  onWrote(data: IEvent): void
}
