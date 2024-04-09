"use client"

import { CalendarHeartIcon, FingerprintIcon, MilestoneIcon } from "lucide-react"
import moment from "../../packages/common-datetime/moment"
import { cn } from "../../packages/common-ui-shadcn/utils"

import { config } from "../config/system"
import { ICardDetail } from "../schema/card.basic"
import { CardFooterItem } from "./card-footer-item"

export const CardFooter = ({ card }: { card?: ICardDetail | null }) => {
  return (
    <div
      className={cn("shrink-0 pb-2 px-4 text-xs text-primary-foreground/50")}
    >
      <div className={"flex  items-center justify-center"}>
        {/*<CardFooterItem*/}
        {/*  Icon={PackageIcon}*/}
        {/*  value={summary?.model?.toUpperCase()}*/}
        {/*/>*/}
        <CardFooterItem
          Icon={CalendarHeartIcon}
          value={moment().format("YYYY-MM-DD")}
        />
        <CardFooterItem Icon={FingerprintIcon} value={card?.id} />
        <CardFooterItem Icon={MilestoneIcon} value={config.version} />
      </div>
    </div>
  )
}
