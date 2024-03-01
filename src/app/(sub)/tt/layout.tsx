"use client"

import { Sidebar } from "@/components/sidebar"
import { Separator } from "@/components/ui/separator"
import { PropsWithChildren } from "react"
import { Textarea } from "@/components/textarea"
import { useInitConversationList } from "@/store/conversation"
import { toast } from "sonner"

const ChatLayout = ({ children }: PropsWithChildren) => {
  useInitConversationList()

  return (
    <div className={"w-full h-full overflow-auto flex border-y"}>
      <Sidebar />

      <Separator orientation={"vertical"} />

      <div className={"grow h-full flex flex-col"}>
        {children}

        <Textarea
          minRows={2}
          className={
            "rounded-lg border my-2 mx-auto w-full max-w-[720px] p-2 shrink-0"
          }
          onQuery={toast.message}
        />
      </div>
    </div>
  )
}
export default ChatLayout
