import { db } from "@/server/db"

export interface ISSE {
  userId: string
  conversationId: string
  trigger: (query: string) => void
  onData: (data: any) => void
}

export class SSE implements ISSE {
  public userId: string
  public conversationId: string

  constructor(userId: string, conversationId: string) {
    this.userId = userId
    this.conversationId = conversationId
  }

  public async trigger(query: string) {
    console.log({ query })
    const conversation = await db.conversation.findUniqueOrThrow({
      where: {
        fromUserId: this.userId,
        id: this.conversationId,
      },
      select: {
        pApps: true,
      },
    })
    const pApps = conversation.pApps
    console.log({ pApps })

    return Promise.all(
      pApps.map(async (pApp) => {
        const model = pApp.modelId
        if (["gpt-3.5-turbo", "gpt-4", "gpt-4-32k"].includes(model)) {
          // todo
        } else {
          // todo
          console.warn(`model ${model} not supported yet`)
        }

        return { pApp }
      }),
    )
  }

  public onData(data: any) {
    console.log({ data })
  }
}
