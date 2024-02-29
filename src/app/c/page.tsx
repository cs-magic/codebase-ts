"use client"

import { useConversationDetailStore } from "@/store/conversation-detail.slice"
import { TextareaAuto } from "@/components/textarea"
import { Separator } from "@/components/ui/separator"
import { PAppComp } from "@/app/c/p-app"
import { Sidebar } from "@/app/c/sidebar"

export default function ConversationPage() {
  const pApps = useConversationDetailStore((state) => state.models)

  return (
    <div className={"w-full grow flex border-y"}>
      <Sidebar />

      <Separator orientation={"vertical"} />

      <div className={"grow h-full flex flex-col gap-2"}>
        <div className={"grow overflow-auto"}>
          {pApps.map((pApp) => (
            <PAppComp pApp={pApp} key={pApp.id} />
          ))}
        </div>

        <TextareaAuto className={"shrink-0"} />
      </div>
    </div>
  )
}
