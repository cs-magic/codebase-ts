"use client"

import { cn } from "@/lib/utils"
import { ComponentProps, forwardRef } from "react"

import TextareaAutoSize from "react-textarea-autosize"
import { useMounted } from "@/hooks/use-mounted"

export const TextareaAuto = forwardRef<
  HTMLTextAreaElement,
  ComponentProps<typeof TextareaAutoSize>
>(({ className, minRows = 1, ...props }, ref) => {
  const mounted = useMounted()
  // avoid layout shift
  const rows = !mounted ? minRows : undefined

  return (
    <TextareaAutoSize
      rows={rows}
      minRows={minRows}
      maxRows={8}
      ref={ref}
      cacheMeasurements
      className={cn(
        "block", // 不加这个会导致高度超标
        "resize-none focus-visible:outline-none bg-transparent",
        className,
      )}
      {...props}
    />
  )
})
TextareaAuto.displayName = "TextareaAuto"
