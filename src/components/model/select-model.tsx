"use client"

import { useModelStore } from "@/store/model.slice"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { llmModels, scenarios } from "@/config/llm"
import { SelectorItem } from "@/schema/llm"

export const SelectBase = <T extends string>({
  label,
  data,
  value,
  setValue,
}: {
  label: string
  data: SelectorItem[]
  value: T
  setValue: (v: T) => void
}) => {
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className={"w-fit focus:ring-1 select-none"}>
        <span>{label}：</span>
        <SelectValue placeholder={label} />
      </SelectTrigger>

      <SelectContent>
        {data.map((obj, index) => (
          <RenderSelectors obj={obj} key={index} />
        ))}
      </SelectContent>
    </Select>
  )
}

const RenderSelectors = ({ obj }: { obj: SelectorItem }) =>
  obj.children ? (
    <SelectGroup>
      <SelectLabel className={"text-xs text-muted-foreground"}>
        {obj.title}
      </SelectLabel>

      {obj.children.map((subObj) => (
        <SelectItem key={subObj.id} value={subObj.id}>
          {subObj.title}
        </SelectItem>
      ))}
      <SelectSeparator />
    </SelectGroup>
  ) : (
    <SelectItem value={obj.id}>{obj.title}</SelectItem>
  )

export const SelectModel = () => {
  const { scenario, setScenario, setModel, model } = useModelStore((state) => ({
    model: state.modelName,
    setModel: state.setModelName,
    scenario: state.scenarioType,
    setScenario: state.setScenarioType,
  }))
  return (
    <div className={"w-full flex items-center gap-2"}>
      <SelectBase
        label={"场景"}
        data={scenarios}
        value={scenario}
        setValue={setScenario}
      />

      <SelectBase
        label={"模型"}
        data={llmModels}
        value={model}
        setValue={setModel}
      />
    </div>
  )
}
