"use client"

import { Sidebar } from "@/app/(sub)/c/sidebar"
import { Separator } from "@/components/ui/separator"
import { useInitConversationList } from "@/store/conversation-list.slice"
import { PropsWithChildren } from "react"

const ChatLayout = ({ children }: PropsWithChildren) => {
  useInitConversationList()

  return (
    <div className={"w-full h-full overflow-auto flex border-y"}>
      <Sidebar />

      <Separator orientation={"vertical"} />

      <div className={"grow h-full flex flex-col gap-2"}>{children}</div>
    </div>
  )
}
export default ChatLayout
