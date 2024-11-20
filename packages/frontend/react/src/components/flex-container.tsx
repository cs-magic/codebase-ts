
import type { Orientation } from "@cs-magic/common/schema/ui"
import { cn } from "@cs-magic/shadcn/lib/utils"
import React, { type HTMLAttributes, forwardRef } from "react"

export const FlexContainer = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { orientation?: Orientation }
>(({ className, orientation, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "h-full",
        "relative w-full overflow-auto",
        "p-2 sm:p-4",
        "flex gap-2 sm:gap-4 items-center justify-center",
        orientation === "vertical" && "flex-col",
        className,
      )}
      {...props}
    />
  )
})
FlexContainer.displayName = "FlexContainer"
