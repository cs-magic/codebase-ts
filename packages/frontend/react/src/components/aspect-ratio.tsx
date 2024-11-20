"use client"

import { cn } from "@cs-magic/shadcn/lib/utils"
import React, { type HTMLAttributes } from "react"
import { useMeasure } from "react-use"


export const VerticalAspectRatio = ({
  ratio,
  className,
  style,
  ...props
}: { ratio: number } & HTMLAttributes<HTMLDivElement>) => {
  const [ref, { width, height }] = useMeasure<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={cn("h-full", className)}
      style={{ width: height / ratio, ...style }}
      {...props}
    />
  )
}
