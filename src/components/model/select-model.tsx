import { ModelType, supportedCompanies } from "@/schema/llm"
import { useModelStore } from "@/store/model.slice"
import { supportedModels } from "@/config/llm"
import { Button } from "@/components/ui/button"
import { IconContainer } from "@/components/containers"
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react"

export const SelectModel = ({
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
