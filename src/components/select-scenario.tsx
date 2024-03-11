import {
  Select,
  SelectContent,
  SelectValue,
} from "../../packages/common-ui/shadcn/shadcn-components/select"
import { SelectTrigger as SelectPrimitiveTrigger } from "@radix-ui/react-select"
import { Text2ImageAppSVG, Text2TextAppSVG } from "@/config/assets"
import { scenarioTypeAtom } from "../store/core.atom"

import { SelctModel } from "./selct-model"
import { useAtom } from "jotai"
import { ScenarioType } from "@/schema/scenario"

export const SelectScenario = () => {
  const [type, setType] = useAtom(scenarioTypeAtom)

  return (
    <Select value={type} onValueChange={(s) => setType(s as ScenarioType)}>
      <SelectPrimitiveTrigger className={"shrink-0"}>
        <SelectValue />
      </SelectPrimitiveTrigger>

      <SelectContent>
        <SelctModel
          value={"text2text"}
          Cover={Text2TextAppSVG}
          label={"文生文"}
        />
        <SelctModel
          value={"text2image"}
          Cover={Text2ImageAppSVG}
          label={"文生图"}
        />
      </SelectContent>
    </Select>
  )
}
