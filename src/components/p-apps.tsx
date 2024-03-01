import { Fragment } from "react"
import { Separator } from "@/components/ui/separator"
import { PAppComp } from "@/components/p-app"
import { IPAppClient } from "@/store/conversation"

export const PAppsComp = ({ pApps }: { pApps: readonly IPAppClient[] }) => (
  <div className={"grow overflow-auto flex gap-1 justify-center"}>
    {pApps.map((pApp) => (
      <Fragment key={pApp.id}>
        <PAppComp pApp={pApp} />
        <Separator orientation={"vertical"} className={"last:hidden"} />
      </Fragment>
    ))}
  </div>
)
