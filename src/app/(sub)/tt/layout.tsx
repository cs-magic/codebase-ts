"use client"

import { Sidebar } from "@/components/sidebar"
import { Separator } from "@/components/ui/separator"
import { PropsWithChildren } from "react"
import { useInitConversations } from "@/store/conversation"

import { QueryInChatLayout } from "@/components/query-in-chat"

const ChatLayout = ({ children }: PropsWithChildren) => {
  // 只能运行一次，不要有其他hook
  useInitConversations()

  return (
    <div className={"w-full h-full overflow-auto flex border-y"}>
      <Sidebar />

      <Separator orientation={"vertical"} />

      <div className={"grow h-full flex flex-col"}>
        {children}

        <QueryInChatLayout />
      </div>
    </div>
  )
}
export default ChatLayout
