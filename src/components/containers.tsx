import { HTMLAttributes, PropsWithChildren } from "react"
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
        "relative",
        "p-2 sm:p-4",
        "flex gap-2 sm:gap-4 items-center justify-center",
        orientation === "vertical" && "flex-col",
        className,
      )}
      {...props}
    />
  )
}

export const IconContainer = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={
        "p-2 text-foreground/75 hover:bg-accent hover:text-foreground rounded-lg"
      }
    >
      {children}
    </div>
  )
}
