import { IPApp } from "@/schema/conversation"
import { useSession } from "next-auth/react"
import { useConversationDetailStore } from "@/store/conversation-detail.slice"
import { IconContainer } from "@/components/containers"
import { MinusCircleIcon, PlusCircleIcon, SettingsIcon } from "lucide-react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { DEFAULT_AVATAR } from "@/config/assets"

export const PAppComp = ({ pApp }: { pApp: IPApp }) => {
  const session = useSession()
  const userAvatar = session.data?.user?.image
  const messages = useConversationDetailStore((state) => state.messages)

  return (
    <div className={""}>
      {/* model line */}
      <div className={"flex"}>
        <div>{pApp.model.title}</div>

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

      {userAvatar &&
        messages.map((m, index) => (
          <div key={index} className={"w-full flex gap-2 p-2"}>
            <Avatar className={"shrink-0"}>
              <AvatarImage
                src={
                  m.role === "user"
                    ? userAvatar
                    : pApp.model.logo ?? DEFAULT_AVATAR
                }
              />
            </Avatar>
            <div>{m.content}</div>
          </div>
        ))}
    </div>
  )
}
