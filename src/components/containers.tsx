"use client"

import {
  ComponentProps,
  HTMLAttributes,
  PropsWithChildren,
  useEffect,
  useRef,
} from "react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

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

export const SeparatorContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className={"w-full flex items-center justify-center overflow-hidden"}>
      <Separator orientation={"horizontal"} className={"grow"} />
      <div className={" text-xs text-muted-foreground shrink-0 mx-4"}>
        {children}
      </div>
      <Separator orientation={"horizontal"} className={"grow"} />
    </div>
  )
}

export const AuthContainer = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={
        " h-full mx-auto flex flex-col justify-center items-center gap-4 bg-muted"
      }
    >
      <div
        className={
          "rounded-lg w-[480px] p-8 bg-background flex flex-col items-center gap-8"
        }
      >
        <div className={"rounded-lg w-full"}>{children}</div>

        <div className={"text-xs text-muted-foreground mt-8"}>
          由<span className={"font-semibold mx-1"}>魔法社</span>提供安全支持
        </div>
      </div>
    </div>
  )
}

export const DigitContainer = ({
  className,
  maxLength,
  focus,
  ...props
}: ComponentProps<typeof Input> & { focus: boolean }) => {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!focus || !ref.current) return

    ref.current.focus()
  }, [focus])

  return (
    <Input
      ref={ref}
      className={cn("w-12 h-12 rounded-lg text-3xl text-center", className)}
      maxLength={1}
      {...props}
    />
  )
}
