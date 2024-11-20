import { Separator } from "@cs-magic/shadcn/ui/separator"
import React, { type PropsWithChildren } from "react"


export const SeparatorContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className={"w-full flex items-center justify-center overflow-hidden"}>
      <Separator className={"grow"} orientation={"horizontal"} />
      <div className={" text-xs text-muted-foreground shrink-0 mx-4"}>{children}</div>
      <Separator className={"grow"} orientation={"horizontal"} />
    </div>
  )
}
