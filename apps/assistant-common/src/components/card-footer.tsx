"use client";

import { CalendarHeartIcon, MilestoneIcon } from "lucide-react";

import { moment } from "@cs-magic/common/datetime/index";
import { cn } from "@cs-magic/shadcn/lib/utils";
import { CardOuterPreview } from "@cs-magic/assistant-backend/schema/index";

import { CardFooterItem } from "./card-footer-item";

export const CardFooter = ({
  outPreview,
}: {
  outPreview?: CardOuterPreview | null;
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
  );
};
