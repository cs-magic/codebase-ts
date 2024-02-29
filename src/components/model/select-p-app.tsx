import { useModelStore } from "@/store/model.slice"
import { Button } from "@/components/ui/button"
import { IconContainer } from "@/components/containers"
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react"

import { IPApp } from "@/schema/conversation"

export const SelectPApp = ({
  pApp,
  type,
}: {
  pApp: IPApp
  type: "toAdd" | "toDel"
}) => {
  const pAppIds = useModelStore((state) => state.pAppIds)
  const addPApp = useModelStore((state) => state.addPAppId)
  const delPApp = useModelStore((state) => state.delPAppId)

  const hasPApp = !!pAppIds.find((p) => p === pApp.id)
  console.log({ pAppIds, type, pApp })

  return (
    <Button
      variant={"ghost"}
      key={pApp.id}
      className={"w-full flex items-center p-2 rounded-lg group"}
      disabled={
        (type === "toAdd" && (hasPApp || pAppIds.length >= 3)) ||
        (type === "toDel" && pAppIds.length <= 1)
      }
    >
      <IconContainer
        className={
          "w-6 h-6 invisible group-hover:visible hover:text-primary-foreground"
        }
        onClick={(event) => {
          if (hasPApp) delPApp(pApp.id)
          else addPApp(pApp.id)
        }}
      >
        {hasPApp ? <MinusCircleIcon /> : <PlusCircleIcon />}
      </IconContainer>

      <span className={"mx-2"}>{pApp.model.title}</span>

      <span className={"grow"} />
      <span className={"text-muted-foreground text-sm"}>
        by {pApp.model.company.title}
      </span>
    </Button>
  )
}
