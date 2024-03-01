import { useSession } from "next-auth/react"
import { IconContainer } from "@/components/containers"
import { MinusCircleIcon, PlusCircleIcon, SettingsIcon } from "lucide-react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { DEFAULT_AVATAR } from "@/config/assets"
import { useSnapshot } from "valtio"
import { delPAppId, messagesState } from "@/store/conversation"
import { Separator } from "@/components/ui/separator"
import { Fragment } from "react"
import { IPApp } from "@/schema/conversation"

export const PAppComp = ({ pApp }: { pApp: IPApp }) => {
  const session = useSession()
  const userAvatar = session.data?.user?.image ?? DEFAULT_AVATAR
  const messages = useSnapshot(messagesState)

  console.log({ messages })

  return (
    <div className={"w-full"}>
      {/* model line */}
      <div className={"w-full flex items-center p-2"}>
        <div>{pApp?.model.title}</div>

        <div className={"grow"} />

        <IconContainer
          onClick={() => {
            delPAppId(pApp.id)
          }}
        >
          <MinusCircleIcon />
        </IconContainer>

        <IconContainer>
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

export const PAppsComp = ({ pApps }: { pApps: readonly IPApp[] }) => (
  <div className={"grow overflow-auto flex gap-1"}>
    {pApps.map((pApp) => (
      <Fragment key={pApp.id}>
        <PAppComp pApp={pApp} />
        <Separator orientation={"vertical"} className={"last:hidden"} />
      </Fragment>
    ))}
  </div>
)
