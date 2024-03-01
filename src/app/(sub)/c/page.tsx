"use client"

import { PAppsComp } from "../../../components/p-app"
import { useSnapshot } from "valtio"
import { pAppIdsState } from "@/hooks/use-conversation"

export default function ConversationPage() {
  const pAppIds = useSnapshot(pAppIdsState)

  return <PAppsComp pAppIds={pAppIds} />
}
