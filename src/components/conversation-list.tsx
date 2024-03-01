import { IConversationBasic } from "@/schema/conversation"
import { Button } from "@/components/ui/button"
import { IconContainer } from "@/components/containers"
import { MoreHorizontal, TrashIcon } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDeleteConversation } from "@/hooks/use-conversation"

export const ConversationListComp = ({
  basic,
}: {
  basic: IConversationBasic
}) => {
  const deleteConversation = useDeleteConversation()

  return (
    <Button variant={"ghost"} className={"w-full justify-start group"}>
      <Link href={`/c/${basic.id}`} className={"grow text-left"}>
        {basic.id}
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconContainer
            className={"w-6 h-6 shrink-0 invisible group-hover:visible"}
          >
            <MoreHorizontal />
          </IconContainer>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem
            className={"gap-2"}
            onClick={() => {
              void deleteConversation(basic.id)
            }}
          >
            <TrashIcon className={"w-4 h-4"} /> 删除会话
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Button>
  )
}
