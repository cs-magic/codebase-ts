import React, { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronDownIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

import { SelectPApp } from "@/components/model/select-p-app"
import { api } from "@/trpc/react"
import { JoinComponents } from "@/components/join-components"
import { useSnapshot } from "valtio"
import { pAppsState } from "@/hooks/use-conversation"

export const SelectPApps = () => {
  const { data: pAppsInDB = [] } = api.llm.listPApps.useQuery()
  const { pApps } = useSnapshot(pAppsState)

  const [filterPApps, setFilterPApps] = useState("")

  console.log({ pApps, pAppsInDB })

  useEffect(() => {
    if (!pApps.length && pAppsInDB.length) {
      const gptPApp = pAppsInDB.find((p) => p.model.id === "gpt-3.5-turbo")
      if (gptPApp) pAppsState.pApps.push(gptPApp)
    }
  }, [pAppsInDB, pApps])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <span className={"text-muted-foreground"}>模型：</span>

          <JoinComponents
            components={pApps.map((p) => (
              <span key={p.id}>{p.title}</span>
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

            {pApps.map((m, index) => (
              <SelectPApp key={index} pApp={m} type={"toDel"} />
            ))}
          </div>

          <Separator orientation={"horizontal"} />

          <Input
            className={"my-4"}
            value={filterPApps}
            onChange={(event) => {
              setFilterPApps(event.currentTarget.value)
            }}
          />

          <div>
            <Label className={"px-2 text-muted-foreground"}>全部</Label>
            {pAppsInDB
              .filter(
                (m) =>
                  m.title?.toLowerCase().includes(filterPApps.toLowerCase()) ??
                  (m.model.title
                    .toLowerCase()
                    .includes(filterPApps.toLowerCase()) ||
                    m.model.company.title.toLowerCase().includes(filterPApps)),
              )
              .map((m, index) => (
                <SelectPApp key={index} pApp={m} type={"toAdd"} />
              ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
