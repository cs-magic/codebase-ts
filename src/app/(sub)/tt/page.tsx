"use client"

import { useSnapshot } from "valtio"
import { pAppsState } from "@/store/conversation"
import { PAppsComp } from "@/components/p-apps"

export default function ConversationPage() {
  const { pApps } = useSnapshot(pAppsState)

  return <PAppsComp pApps={pApps} />
}
