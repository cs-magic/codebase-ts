import { useSession } from "next-auth/react"
import { IconContainer } from "@/components/containers"
import { MinusCircleIcon, PlusCircleIcon, SettingsIcon } from "lucide-react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { DEFAULT_AVATAR } from "@/config/assets"
import { useSnapshot } from "valtio"
import { delPApp, messagesState, pAppsState } from "@/store/conversation"
import { IPApp } from "@/schema/conversation"
import { cn } from "@/lib/utils"
import { openSelectPApps } from "@/store/ui"

export const PAppComp = ({ pApp }: { pApp: IPApp }) => {
  const session = useSession()
  const userAvatar = session.data?.user?.image ?? DEFAULT_AVATAR
  const messages = useSnapshot(messagesState)
  const { pApps } = useSnapshot(pAppsState)

  console.log({ messages })

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
