import { callChatGPT } from "@/server/llm/openai"
import { OpenAIModelType } from "@/schema/llm"

import { IConversationBody, IEvent } from "@/schema/api"
import { IEventsManager } from "@/schema/events-manager"
import { NextRequest } from "next/server"

export class EventsManager {
  private manager: Record<string, IEventsManager> = {}

  public async trigger(data: IConversationBody) {
    try {
      const { conversationId, modelName, prompt } = data
      this.manager[conversationId] = { events: [], endpoints: [] }

      const serverSend = async (eventMessage: IEvent) => {
        this.manager[conversationId]!.events.push(eventMessage)
        this.manager[conversationId]!.endpoints.forEach((endpoint) => {
          endpoint.onWrote(eventMessage)
        })
        console.log("[sse] server sending: ", JSON.stringify(eventMessage))
      }

      const stream = await callChatGPT({
        prompt, // todo
        modelName: modelName as OpenAIModelType,
      })

      for await (const chunk of stream) {
        const token = chunk.content as string
        // console.debug({ token })
        await serverSend({
          event: "token",
          data: { id: conversationId, content: token },
        })
        await new Promise((r) => setTimeout(r, 100))
      }
    } catch (e) {
      console.log("trigger error: ", e)
    }
  }

  /**
   * 法一：先从数据库读，再从内存里接上
   *
   * 法二：没完成则从内存中读，否则从数据库里读
   * @param params
   */
  public async read(conversationId: string | null, req: NextRequest) {
    const responseStream = new TransformStream()
    const writer = responseStream.writable.getWriter()
    const encoder = new TextEncoder()

    class Endpoint implements Endpoint {
      public async onWrote(data: IEvent) {
        await clientSend(data)
      }
    }

    const clientSend = async (eventMessage: IEvent) => {
      if (eventMessage.event === "done") return writer.close()
      const s = `event: ${eventMessage.event}\ndata: ${JSON.stringify(
        eventMessage.data,
      )}\n\n`
      // console.log(`[sse] client sending: ${s.replace(/\n/g, "\\n")}`,)
      await writer.write(encoder.encode(s))
    }

    const endpoint = new Endpoint()

    const init = async () => {
      if (conversationId && conversationId in this.manager) {
        const m = this.manager[conversationId]!

        // ref: https://github.com/vercel/next.js/discussions/61972#discussioncomment-8545109
        req.signal.onabort = async () => {
          const index = m.endpoints.findIndex((e) => e === endpoint)
          console.log(`[sse] client[${index}] ABORTED`)
          await writer.close() // unnecessary but better
          m.endpoints.splice(index, 1)
        }

        // receive new messages
        m.endpoints.push(endpoint)

        // push old messages
        for (const eventMessage of m.events) await clientSend(eventMessage)
      }
    }

    // DO NOT await or cannot init
    void init()

    return new Response(responseStream.readable, {
      headers: {
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
        "Cache-Control": "no-cache, no-transform",
      },
    })
  }
}
