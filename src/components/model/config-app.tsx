"use client"

import { SelectModels } from "@/components/model/select-models"
import { SelectScenario } from "@/components/model/select-scenario"

export const ConfigApp = () => {
  return (
    <div className={"flex items-center gap-2"}>
      <SelectScenario />

      <SelectModels />

      {/*<SelectPrompt/>*/}
    </div>
  )
}
