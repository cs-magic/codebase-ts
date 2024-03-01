"use client"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { ConversationListComp } from "./conversation-list"
import { useSnapshot } from "valtio"
import {
  conversationsState,
  useAddConversation,
} from "@/hooks/use-conversation"

export const Sidebar = () => {
  const { conversations } = useSnapshot(conversationsState)
  const { addConversationWithoutPrompt } = useAddConversation()
  console.log({ conversations })

  return (
    <div className={"w-60 shrink-0 p-4 h-full flex flex-col"}>
      <Button
        className={"w-full gap-2 my-2 shrink-0"}
        variant={"outline"}
        onClick={addConversationWithoutPrompt}
      >
        <PlusIcon className={"w-4 h-4"} />
        新建会话
      </Button>

      <div className={"grow overflow-auto"}>
        {conversations.map((basic) => (
          <ConversationListComp basic={basic} key={basic.id} />
        ))}
      </div>
    </div>
  )
}
