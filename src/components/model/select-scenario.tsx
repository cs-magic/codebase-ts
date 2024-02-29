import { useModelStore } from "@/store/model.slice"
import { Select, SelectContent, SelectValue } from "@/components/ui/select"
import { SelectTrigger as SelectPrimitiveTrigger } from "@radix-ui/react-select/dist"
import { Text2ImageAppSVG, Text2TextAppSVG } from "@/config/assets"

import { SelectModelItem } from "@/components/model/select-model-item"

export const SelectScenario = () => {
  const { scenario, setScenario } = useModelStore((state) => ({
    scenario: state.scenarioType,
    setScenario: state.setScenarioType,
  }))
  return (
    <Select value={scenario} onValueChange={setScenario}>
      <SelectPrimitiveTrigger>
        <SelectValue />
      </SelectPrimitiveTrigger>

      <SelectContent>
        <SelectModelItem
          value={"text2text"}
          Cover={Text2TextAppSVG}
          label={"文生文"}
        />
        <SelectModelItem
          value={"text2image"}
          Cover={Text2ImageAppSVG}
          label={"文生图"}
        />
      </SelectContent>
    </Select>
  )
}
