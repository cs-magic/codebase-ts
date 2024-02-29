import { useModelStore } from "@/store/model.slice"
import { ComponentType, Fragment, useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronDownIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

import { SelectModel } from "@/components/model/select-model"
import { api } from "@/trpc/react"
import React from "react"

export const SelectModels = () => {
  const { data: modelsInDB = [] } = api.llm.listModels.useQuery()
  const { models } = useModelStore((state) => ({
    models: state.models,
  }))

  const [filterModel, setFilterModel] = useState("")
  const filteredModels = modelsInDB.filter(
    (m) =>
      m.title.toLowerCase().includes(filterModel.toLowerCase()) ||
      m.company.title.toLowerCase().includes(filterModel),
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <span className={"text-muted-foreground"}>模型：</span>

          <JoinComponents
            components={models.map((m) => (
              <span key={m.id}>{m.title}</span>
            ))}
            separator={
              <span className={"text-sm text-muted-foreground mx-1"}>vs</span>
            }
          />

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
              <SelectModel key={m.id} model={m} type={"toDel"} />
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
              <SelectModel key={m.id} model={m} type={"toAdd"} />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface JoinComponentsProps {
  components: React.ReactNode[] // Array of React nodes to join
  separator: React.ReactNode // Separator to use between each pair of components
}

const JoinComponents: React.FC<JoinComponentsProps> = ({
  components,
  separator,
}) => {
  return (
    <>
      {components.map((component, index) => {
        return (
          <React.Fragment key={index}>
            {component}
            {index < components.length - 1 && React.isValidElement(separator)
              ? React.cloneElement(separator, { key: `separator-${index}` })
              : null}
          </React.Fragment>
        )
      })}
    </>
  )
}

export default JoinComponents
