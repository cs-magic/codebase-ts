"use client"
import { buttonVariants } from "../../packages/common/components/ui/button"
import { MoreHorizontal, TrashIcon } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../packages/common/components/ui/dropdown-menu"
import { cn } from "../../packages/common/lib/utils"

import { IconContainer } from "../../packages/common/components/icon-container"
import { useDelConv } from "@/hooks/use-conv-del"
import { useAtom } from "jotai"
import { convIdAtom } from "@/store/conv"

export const ConversationListComp = ({ conv }: { conv: { id: string } }) => {
  const deleteConv = useDelConv()
  const [convId] = useAtom(convIdAtom)

  return (
    <div
      className={cn(
        "w-full justify-start group px-2 gap-1",
        buttonVariants({ variant: "ghost" }),
        convId === conv.id && "bg-accent/50",
      )}
    >
      <Link href={`/tt/${conv.id}`} className={"grow truncate text-left py-2"}>
        {conv.id}
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
            onClick={(event) => {
              void deleteConv(conv.id)
            }}
          >
            <TrashIcon className={"w-4 h-4"} /> 删除会话
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}