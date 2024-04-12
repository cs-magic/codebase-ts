import { WechatyBuilder } from "wechaty"
import { type IBotStaticContext } from "./schema"

declare module "wechaty" {
  interface Wechaty extends ReturnType<typeof WechatyBuilder.build> {
    staticContext: IBotStaticContext

    prettyQuery: (title: string, content: string, tips?: string) => string
  }
}
