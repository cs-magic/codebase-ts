"use client"

import { PAppsComp } from "@/components/p-app"
import { api } from "@/trpc/react"

export default function ConversationPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const { data: conversation } = api.llm.getConversations.useQuery({
    conversationId: id,
  })

  return <PAppsComp pAppIds={conversation?.pApps.map((p) => p.id) ?? []} />
}
