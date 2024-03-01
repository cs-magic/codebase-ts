import { useSession } from "next-auth/react"
import { IconContainer } from "@/components/containers"
import { MinusCircleIcon, PlusCircleIcon, SettingsIcon } from "lucide-react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { DEFAULT_AVATAR } from "@/config/assets"
import { api } from "@/trpc/react"
import { useSnapshot } from "valtio"
import { messagesState } from "@/hooks/use-conversation"

export const PAppComp = ({ pAppId }: { pAppId: string }) => {
  const session = useSession()
  const userAvatar = session.data?.user?.image ?? DEFAULT_AVATAR
  const messages = useSnapshot(messagesState)
  const { data: pApp, isLoading } = api.llm.getPApp.useQuery(pAppId)

  console.log({ messages })

  return (
    <div className={"w-full bg-cyan-800"}>
      {/* model line */}
      <div className={"w-full flex items-center p-2"}>
        <div>{pApp?.model.title}</div>

        <div className={"grow"} />

        <IconContainer>
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

export const PAppsComp = ({ pAppIds }: { pAppIds: readonly string[] }) => (
  <div className={"grow overflow-auto"}>
    {pAppIds.map((pAppId) => (
      <PAppComp pAppId={pAppId} key={pAppId} />
    ))}
  </div>
)
