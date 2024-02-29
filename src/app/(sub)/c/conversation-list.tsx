import { IConversationBasic } from "@/schema/conversation"
import { Button } from "@/components/ui/button"
import { IconContainer } from "@/components/containers"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"

export const ConversationListComp = ({
  basic,
}: {
  basic: IConversationBasic
}) => {
  return (
    <Button variant={"ghost"} className={"w-full justify-start group"}>
      <Link href={`/c/${basic.id}`} className={"grow text-left"}>
        {basic.id}
      </Link>

      <IconContainer
        className={"w-6 h-6 shrink-0 invisible group-hover:visible"}
      >
        <MoreHorizontal />
      </IconContainer>
    </Button>
  )
}
