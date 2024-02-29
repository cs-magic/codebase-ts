import { useModelStore } from "@/store/model.slice"
import { ReactNode, useState } from "react"
import { supportedModels } from "@/config/llm"
import { supportedCompanies } from "@/schema/llm"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronDownIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

import { SelectModel } from "@/components/model/select-model"
import { cn } from "@/lib/utils"

export const SelectModels = () => {
  const { models } = useModelStore((state) => ({
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
                <span
                  key={cur}
                  className={
                    cn()
                    // "underline underline-offset-4"
                  }
                >
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
              <SelectModel key={m} modelType={m} type={"toDel"} />
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
              <SelectModel key={m} modelType={m} type={"toAdd"} />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
