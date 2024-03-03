"use client"
import { Button } from "../../../packages/common/components/ui/button"
import { MinusIcon, PlusIcon } from "lucide-react"
import { ConversationListComp } from "./sidebar-conversation-item"
import { useAtom } from "jotai"
import {
  useAddQueryConvAtom,
  useDeleteAllQueryConvsAtom,
} from "@/hooks/use-query-conv"
import { convsAtom } from "@/store/conv.atom"

export const Sidebar = () => {
  const [conversations] = useAtom(convsAtom)
  const addConversation = useAddQueryConvAtom()
  const deleteAllConversations = useDeleteAllQueryConvsAtom()

  return (
    <div className={"hidden sm:w-60 shrink-0 p-4 h-full sm:flex flex-col"}>
      <Button
        className={"w-full gap-2 my-2 shrink-0"}
        variant={"outline"}
        onClick={() => addConversation()}
      >
        <PlusIcon className={"w-4 h-4"} />
        新建会话
      </Button>

      <Button
        className={"w-full gap-2 my-2 shrink-0"}
        variant={"destructive"}
        onClick={deleteAllConversations}
      >
        <MinusIcon className={"w-4 h-4"} />
        清空会话
      </Button>

      <div className={"grow overflow-auto"}>
        {conversations.map((conversation) => (
          <ConversationListComp conv={conversation} key={conversation.id} />
        ))}
      </div>
    </div>
  )
}
