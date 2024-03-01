"use client"

import { api } from "@/lib/trpc/react"
import { useEffect } from "react"
import { useSnapshot } from "valtio"
import { conversationsState, pAppsState } from "@/store/conversation"
import { PAppsComp } from "@/components/p-apps"
import { useSession } from "next-auth/react"
import { UnexpectedError } from "@/schema/error"
import { SSE } from "@/server/sse"

export default function ConversationPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const { data: conversation } = api.llm.getConversations.useQuery({
    conversationId: id,
  })
  useEffect(() => {
    if (conversation) {
      // pessimistic update
      conversationsState.conversationId = id
      pAppsState.pApps = conversation.pApps
    }
  }, [conversation])

  const { pApps } = useSnapshot(pAppsState)

  return <PAppsComp pApps={pApps} />
}
