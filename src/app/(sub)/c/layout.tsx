"use client"

import { Sidebar } from "@/components/sidebar"
import { Separator } from "@/components/ui/separator"
import { PropsWithChildren } from "react"
import { TextareaAuto } from "@/components/textarea"
import { useInitConversationList } from "@/hooks/use-conversation"

const ChatLayout = ({ children }: PropsWithChildren) => {
  useInitConversationList()

  return (
    <div className={"w-full h-full overflow-auto flex border-y"}>
      <Sidebar />

      <Separator orientation={"vertical"} />

      <div className={"grow h-full flex flex-col gap-2"}>
        {children}

        <TextareaAuto
          minRows={2}
          className={"rounded-lg border m-2 p-2 shrink-0"}
        />
      </div>
    </div>
  )
}
export default ChatLayout
