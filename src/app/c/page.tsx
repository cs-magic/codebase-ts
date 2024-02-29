"use client"

import { useConversationDetailStore } from "@/store/conversation-detail.slice"
import { IconContainer } from "@/components/containers"
import {
  MinusCircleIcon,
  MoreHorizontal,
  PlusCircleIcon,
  PlusIcon,
  SettingsIcon,
} from "lucide-react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { useSession } from "next-auth/react"
import { TextareaAuto } from "@/components/textarea"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useConversationListStore } from "@/store/conversation-list.slice"
import { DEFAULT_AVATAR } from "@/config/assets"

import { IConversationBasic, IConversationModel } from "@/schema/conversation"

export default function ConversationPage() {
  const models = useConversationDetailStore((state) => state.models)

  return (
    <div className={"w-full grow flex border-y"}>
      <Sidebar />

      <Separator orientation={"vertical"} />

      <div className={"grow h-full flex flex-col gap-2"}>
        <div className={"grow overflow-auto"}>
          {models.map((context) => (
            <ModelContextComp model={context} key={context.modelId} />
          ))}
        </div>

        <TextareaAuto className={"shrink-0"} />
      </div>
    </div>
  )
}

const Sidebar = () => {
  const conversationList = useConversationListStore((state) => state.data)
  const addConversation = useConversationListStore(
    (state) => state.addConversation,
  )
  console.log({ conversationList })

  return (
    <div className={"w-60 shrink-0 p-4"}>
      <Button
        className={"w-full gap-2 my-2"}
        variant={"outline"}
        onClick={addConversation}
      >
        <PlusIcon className={"w-4 h-4"} />
        新建会话
      </Button>

      {conversationList.map((basic) => (
        <ConversationBasicView basic={basic} key={basic.id} />
      ))}
    </div>
  )
}

const ConversationBasicView = ({ basic }: { basic: IConversationBasic }) => {
  return (
    <Button variant={"ghost"} className={"w-full justify-start group"}>
      <span>{basic.id}</span>

      <IconContainer
        className={"ml-auto w-6 h-6 invisible group-hover:visible"}
      >
        <MoreHorizontal />
      </IconContainer>
    </Button>
  )
}

const ModelContextComp = ({ model }: { model: IConversationModel }) => {
  const session = useSession()
  const userAvatar = session.data?.user?.image
  const messages = useConversationDetailStore((state) => state.messages)

  return (
    <div className={""}>
      {/* model line */}
      <div className={"flex"}>
        <div>{model.model.title}</div>

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
                    : model.model.logo ?? DEFAULT_AVATAR
                }
              />
            </Avatar>
            <div>{m.content}</div>
          </div>
        ))}
    </div>
  )
}
