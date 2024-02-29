import { IConversationBasic } from "@/schema/conversation"
import { Button } from "@/components/ui/button"
import { IconContainer } from "@/components/containers"
import { MoreHorizontal } from "lucide-react"

export const ConversationListComp = ({
  basic,
}: {
  basic: IConversationBasic
}) => {
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
