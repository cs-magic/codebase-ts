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
import { supportedModels } from "@/config/llm"
import {
  ModelType,
  ScenarioType,
  SelectorItem,
  supportedCompanies,
} from "@/schema/llm"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Check,
  ChevronDownIcon,
  MinusCircleIcon,
  PlusCircleIcon,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { ElementType, ReactNode, useState } from "react"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { IconContainer } from "@/components/containers"
import { Text2ImageAppSVG, Text2TextAppSVG } from "@/config/assets"
import {
  SelectItem as SelectPrimitiveItem,
  SelectItemText,
  SelectTrigger as SelectPrimitiveTrigger,
} from "@radix-ui/react-select"
import * as SelectPrimitive from "@radix-ui/react-select"

export const SelectModel = () => {
  const { scenario, setScenario, models } = useModelStore((state) => ({
    scenario: state.scenarioType,
    setScenario: state.setScenarioType,

    models: state.models,
  }))

  const [filterModel, setFilterModel] = useState("")
  const filteredModels = Object.values(supportedModels)
    .filter(
      (m) =>
        m.title.toLowerCase().includes(filterModel.toLowerCase()) ||
        supportedCompanies[m.company].title.toLowerCase().includes(filterModel),
    )
    .map((m) => m.id)
    .sort((a, b) => {
      if (models.includes(a) && !models.includes(b)) return 1
      if (!models.includes(a) && models.includes(b)) return -1
      return a.localeCompare(b)
    })

  return (
    <div className={"flex items-center gap-2"}>
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

      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"}>
            <span className={"text-muted-foreground"}>模型：</span>
            {models
              .map((m) => supportedModels[m].title)
              .reduce<ReactNode[]>(
                (prev, cur, index) => [
                  ...prev,
                  !prev.length ? null : (
                    <span
                      key={index}
                      className={"text-sm text-muted-foreground mx-1"}
                    >
                      vs
                    </span>
                  ),
                  <span key={cur} className={"underline underline-offset-4"}>
                    {cur}
                  </span>,
                ],
                [],
              )}
            <ChevronDownIcon className={"w-4 h-4 text-muted-foreground ml-1"} />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <div className={"flex flex-col gap-2"}>
            <div>
              <Label className={"px-2 text-muted-foreground"}>
                <span>已选择</span>
                <span className={"text-xs"}>（1-3个）</span>
              </Label>
              {models.map((m) => (
                <ModelSelector key={m} modelType={m} type={"toDel"} />
              ))}
            </div>

            <Separator orientation={"horizontal"} />

            <Input
              className={"my-4"}
              value={filterModel}
              onChange={(event) => {
                setFilterModel(event.currentTarget.value)
              }}
            />

            <div>
              <Label className={"px-2 text-muted-foreground"}>全部</Label>
              {filteredModels.map((m) => (
                <ModelSelector key={m} modelType={m} type={"toAdd"} />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Select>
        <SelectTrigger>
          <SelectValue placeholder={"prompt"} />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Prompt</SelectLabel>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export const ModelSelector = ({
  modelType,
  type,
}: {
  modelType: ModelType
  type: "toAdd" | "toDel"
}) => {
  const { models, addModel, delModel } = useModelStore((state) => ({
    models: state.models,
    addModel: state.addModel,
    delModel: state.delModel,
  }))

  const model = supportedModels[modelType]
  const hasModel = models.includes(modelType)

  return (
    <Button
      variant={"ghost"}
      key={model.title}
      className={"w-full flex items-center  p-2 rounded-lg group"}
      disabled={
        (type === "toAdd" && (hasModel || models.length >= 3)) ||
        (type === "toDel" && (!hasModel || models.length <= 1))
      }
    >
      <IconContainer
        className={
          "w-6 h-6 invisible group-hover:visible hover:text-primary-foreground"
        }
        onClick={(event) => {
          const action = hasModel ? delModel : addModel
          action(modelType)
        }}
      >
        {hasModel ? <MinusCircleIcon /> : <PlusCircleIcon />}
      </IconContainer>

      <span className={"mx-2"}>{model.title}</span>

      <span className={"grow"} />
      <span className={"text-muted-foreground text-sm"}>
        by {supportedCompanies[model.company].title}
      </span>
    </Button>
  )
}

export const SelectModelItem = ({
  value,
  Cover,
  label,
}: {
  value: ScenarioType
  Cover: ElementType
  label: string
}) => {
  return (
    <SelectPrimitiveItem
      value={value}
      className={
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
      }
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>

      <div className={"flex items-center gap-2 shrink-0"}>
        <SelectItemText>
          <Cover className={"w-10 h-10"} />
        </SelectItemText>
        <span>{label}</span>
      </div>
    </SelectPrimitiveItem>
  )
}
