"use client"

import { api } from "@/trpc/react"
import { useEffect } from "react"
import { useSnapshot } from "valtio"
import { pAppsState } from "@/store/conversation"
import { PAppsComp } from "@/components/p-apps"

export default function ConversationPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const { data: conversation } = api.llm.getConversations.useQuery({
    conversationId: id,
  })
  const { pApps } = useSnapshot(pAppsState)
  useEffect(() => {
    if (conversation) {
      pAppsState.pApps = conversation.pApps
    }
  }, [conversation])

  return <PAppsComp pApps={pApps} />
}
