import { useAtom } from "jotai"
import {
  delAppAtom,
  persistedAppsAtom,
  selectedAppIDAtom,
  uiSelectAppsDialogOpenAtom,
} from "@/store/app.atom"
import {
  Lock,
  MinusCircleIcon,
  PlusCircleIcon,
  SettingsIcon,
  StopCircle,
  Unlock,
} from "lucide-react"
import { cn } from "../../packages/common/lib/utils"
import { IconContainer } from "../../packages/common/components/icon-container"

export const TopBar = ({
  appID,
  title,
  fetching,
}: {
  appID: string
  title: string
  fetching: boolean
}) => {
  const [, delApp] = useAtom(delAppAtom)
  const [persistedApps] = useAtom(persistedAppsAtom)
  const [selectedAppID, setSelectedAppID] = useAtom(selectedAppIDAtom)
  const [, setOpen] = useAtom(uiSelectAppsDialogOpenAtom)

  const selected = appID === selectedAppID
  const LockOrNot = selected ? Lock : Unlock
  // console.log({ appId, currentPAppId })

  return (
    <div
      className={cn(
        "w-full overflow-hidden flex items-center p-2 border-b",
        selected && "border-b border-primary-foreground/50",
      )}
    >
      <div className={"flex items-center gap-2 overflow-hidden"}>
        <div className={"w-full flex gap-2 items-baseline"}>
          <span className={"truncate"}>{title}</span>

          <span className={"text-muted-foreground text-xs"}>{appID}</span>
        </div>
      </div>
      <div className={"grow"} />

      <IconContainer
        tooltipContent={"选中当前的App，每次发送问题时以它的上下文对齐"}
        onClick={() => {
          setSelectedAppID(appID)
        }}
      >
        <LockOrNot className={cn(selected && "text-primary-foreground")} />
      </IconContainer>

      <IconContainer
        tooltipContent={"停止生成会话（仅限正在生成时使用）（TODO）"}
        onClick={() => {
          // selectPApp(appId)
        }}
      >
        <StopCircle className={cn(!fetching && "text-muted-foreground")} />
      </IconContainer>

      <IconContainer
        tooltipContent={"删除一个App（注意，暂不可恢复）"}
        className={cn(persistedApps.length === 1 && "text-muted-foreground")}
        onClick={() => {
          void delApp(appID)
        }}
      >
        <MinusCircleIcon />
      </IconContainer>

      <IconContainer
        tooltipContent={"添加一个App（聊天内容与被选中App同步）"}
        onClick={() => setOpen(true)}
      >
        <PlusCircleIcon />
      </IconContainer>

      <IconContainer tooltipContent={"设置App（TODO）"}>
        <SettingsIcon />
      </IconContainer>
    </div>
  )
}