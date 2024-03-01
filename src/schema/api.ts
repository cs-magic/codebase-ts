export type ITokenEventData = {
  id: string
  content: string
}
export type IEvent =
  | { event: "done" }
  | { event: "token"; data: ITokenEventData }

export type IGetConversationParams = {
  conversationId: string
}

export interface ICreateConversationBody {
  conversationId?: string
  prompt: string
  modelName: string
}

export type IConversationBody = ICreateConversationBody & IGetConversationParams
