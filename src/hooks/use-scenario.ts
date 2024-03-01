import { proxy } from "valtio"
import { ScenarioType } from "@/schema/llm"

export const scenarioState = proxy<{ type: ScenarioType }>({
  type: "text2text",
})
