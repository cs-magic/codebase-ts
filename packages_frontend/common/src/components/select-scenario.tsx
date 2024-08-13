import Text2ImageAppSVG from "@cs-magic/assets/products/t2i.svg"
import Text2TextAppSVG from "@cs-magic/assets/products/t2t.svg"
import {
  Select,
  SelectContent,
  SelectValue,
} from "@cs-magic/react-ui/dist/shadcn/ui/select.js"
import { SelectTrigger as SelectPrimitiveTrigger } from "@radix-ui/react-select"

import { useAtom } from "jotai"
import { scenarioTypeAtom } from "../store/system.atom"
import { SelectModel } from "./_select-model"
import { ScenarioType } from "@cs-magic/common/dist/schema/scenario.js"

export const SelectScenario = () => {
  const [type, setType] = useAtom(scenarioTypeAtom)

  return (
    <Select value={type} onValueChange={(s) => setType(s as ScenarioType)}>
      <SelectPrimitiveTrigger className={"shrink-0"}>
        <SelectValue />
      </SelectPrimitiveTrigger>

      <SelectContent>
        <SelectModel
          value={"text2text"}
          Cover={Text2TextAppSVG}
          label={"文生文"}
        />
        <SelectModel
          value={"text2image"}
          Cover={Text2ImageAppSVG}
          label={"文生图"}
        />
      </SelectContent>
    </Select>
  )
}
