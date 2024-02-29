"use client"

import { SelectPApps } from "@/components/model/select-p-apps"
import { SelectScenario } from "@/components/model/select-scenario"

export const ConfigApp = () => {
  return (
    <div className={"flex items-center gap-2"}>
      <SelectScenario />

      <SelectPApps />

      {/*<SelectPrompt/>*/}
    </div>
  )
}