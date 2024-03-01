import { useSession } from "next-auth/react"
import { IconContainer } from "@/components/containers"
import { MinusCircleIcon, PlusCircleIcon, SettingsIcon } from "lucide-react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { DEFAULT_AVATAR } from "@/config/assets"
import { useSnapshot } from "valtio"
import {
  delPApp,
  IPAppClient,
  messagesState,
  pAppsState,
} from "@/store/conversation"
import { cn } from "@/lib/utils"
import { openSelectPApps } from "@/store/ui"
import { useEffect } from "react"
import { last } from "lodash"
import { nanoid } from "nanoid"
import { fetchSSE } from "@/lib/sse"

export const PAppComp = ({ pApp }: { pApp: IPAppClient }) => {
  const session = useSession()
  const userAvatar = session.data?.user?.image ?? DEFAULT_AVATAR
  const messages = useSnapshot(messagesState)
  const { pApps } = useSnapshot(pAppsState)

  const { id } = pApp

  useEffect(() => {
    if (!pApp.needFetchLLM) return
    void fetchSSE(`/api/llm?r=${id}`, {
      onToken: (token) => {
        // should always use store, instead of proxy
        if (last(messagesState)!.role === "user")
          messagesState.push({
            role: "assistant",
            content: token,
            id: nanoid(),
            updatedAt: new Date(),
          })
        else {
          last(messagesState)!.content += token
        }
      },
    })
  }, [pApp.needFetchLLM])

  const needFetchLLM = pApp.needFetchLLM
  console.log({ pApp, needFetchLLM, messages })

  return (
    <div className={"w-full"}>
      {/* model line */}
      <div className={"w-full flex items-center p-2 border-b"}>
        <div>{pApp?.model.title}</div>

        <div className={"grow"} />

        <IconContainer
          className={cn(pApps.length === 1 && "text-muted-foreground")}
          onClick={() => {
            delPApp(pApp.id)
          }}
        >
          <MinusCircleIcon />
        </IconContainer>

        <IconContainer onClick={openSelectPApps}>
          <PlusCircleIcon />
        </IconContainer>

        <IconContainer>
          <SettingsIcon />
        </IconContainer>
      </div>

      {messages.map((m, index) => (
        <div key={index} className={"w-full flex gap-2 p-2"}>
          <Avatar className={"shrink-0"}>
            <AvatarImage
              src={
                m.role === "user"
                  ? userAvatar
                  : pApp?.model.logo ?? DEFAULT_AVATAR
              }
            />
          </Avatar>

          <div>{m.content}</div>
        </div>
      ))}
    </div>
  )
}
