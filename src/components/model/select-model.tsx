import { useModelStore } from "@/store/model.slice"
import { Button } from "@/components/ui/button"
import { IconContainer } from "@/components/containers"
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react"

import { IModel } from "@/schema/conversation"

export const SelectModel = ({
  model,
  type,
}: {
  model: IModel
  type: "toAdd" | "toDel"
}) => {
  const { models, addModel, delModel } = useModelStore((state) => ({
    models: state.models,
    addModel: state.addModel,
    delModel: state.delModel,
  }))

  const hasModel = !!models.find((m) => m.id === model.id)

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
          if (hasModel) delModel(model.id)
          else addModel(model)
        }}
      >
        {hasModel ? <MinusCircleIcon /> : <PlusCircleIcon />}
      </IconContainer>

      <span className={"mx-2"}>{model.title}</span>

      <span className={"grow"} />
      <span className={"text-muted-foreground text-sm"}>
        by {model.company.title}
      </span>
    </Button>
  )
}
