"use client"

import { moment } from "@cs-magic/common/dist/datetime/index.js"
import { CalendarHeartIcon, MilestoneIcon } from "lucide-react"
import { CardFooterItem } from "./card-footer-item"
import { CardOuterPreview } from "@cs-magic/swot-backend/schema"
import { cn } from "@cs-magic/react-ui/shadcn/utils"

export const CardFooter = ({
  outPreview,
}: {
  outPreview?: CardOuterPreview | null
}) => {
  return (
    <div
      className={cn("shrink-0 px-4 py-4 text-xs text-primary-foreground/50")}
    >
      <div className={"flex items-center justify-center gap-2"}>
        <CardFooterItem
          Icon={CalendarHeartIcon}
          value={moment().format("YYYY-MM-DD")}
        />
        {/*<CardFooterItem Icon={FingerprintIcon} value={outPreview?.id} />*/}
        <CardFooterItem Icon={MilestoneIcon} value={"0.1.0"} />
      </div>
    </div>
  )
}
