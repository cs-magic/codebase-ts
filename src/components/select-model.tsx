"use client"

import { useLlmStore } from "@/store/model.slice"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { llmModels } from "@/config/llm"

export const SelectModel = () => {
  const [model, setModel] = useLlmStore((state) => [
    state.modelName,
    state.setModelName,
  ])

  return (
    <Select value={model} onValueChange={setModel}>
      <SelectTrigger>
        <SelectValue placeholder={"Models"} />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Models</SelectLabel>

          {llmModels.map((llmModel) => (
            <SelectItem key={llmModel.id} value={llmModel.id}>
              {llmModel.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
