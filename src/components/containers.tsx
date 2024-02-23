import { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export type Orientation = "horizontal" | "vertical"

export const Container = ({
  className,
  orientation,
  ...props
}: HTMLAttributes<HTMLDivElement> & { orientation?: Orientation }) => {
  return (
    <div
      className={cn(
        "p-2 sm:p-4",
        "flex gap-2 sm:gap-4 items-center justify-center",
        orientation === "vertical" && "flex-col",
        className,
      )}
      {...props}
    />
  )
}
