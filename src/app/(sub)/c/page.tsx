"use client"

import { useConversationDetailStore } from "@/store/conversation-detail.slice"
import { TextareaAuto } from "@/components/textarea"
import { PAppComp } from "./p-app"

export default function ConversationPage() {
  const pApps = useConversationDetailStore((state) => state.models)

  return (
    <>
      <div className={"grow overflow-auto"}>
        {pApps.map((pApp) => (
          <PAppComp pApp={pApp} key={pApp.id} />
        ))}
      </div>

      <TextareaAuto className={"shrink-0"} />
    </>
  )
}
