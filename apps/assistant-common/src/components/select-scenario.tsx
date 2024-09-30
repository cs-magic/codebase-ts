import { SelectTrigger as SelectPrimitiveTrigger } from "@radix-ui/react-select";
import { useAtom } from "jotai";

import { ScenarioType } from "@cs-magic/common/schema/scenario";
import { Select, SelectContent, SelectValue } from "@cs-magic/shadcn/ui/select";

import { scenarioTypeAtom } from "../store/system.atom";

import { SelectModel } from "./_select-model";
import Text2ImageAppSVG from "@/products/t2i.svg";
import Text2TextAppSVG from "@/products/t2t.svg";

export const SelectScenario = () => {
  const [type, setType] = useAtom(scenarioTypeAtom);

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
  );
};
