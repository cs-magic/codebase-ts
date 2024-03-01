"use client"

import { PAppsComp } from "../../../components/p-app"
import { useSnapshot } from "valtio"
import { pAppsState } from "@/hooks/use-conversation"

export default function ConversationPage() {
  const { pApps } = useSnapshot(pAppsState)

  return <PAppsComp pApps={pApps} />
}
