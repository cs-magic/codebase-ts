"use client"

import { cn } from "@cs-magic/shadcn/lib/utils"
import { useAtom } from "jotai"
import React, { type ComponentProps, forwardRef } from "react"
import ReactTextareaAutoSize from "react-textarea-autosize"


import { useMounted } from "@/hooks/use-mounted"
import type { Atom } from "@/store/jotai.types"

const TextareaInner = forwardRef<
  HTMLTextAreaElement,
  ComponentProps<typeof ReactTextareaAutoSize> & {
    onQuery?: (s: string) => void
    setValue?: (s: string) => void
  }
>(({ className, minRows = 1, onKeyDown, setValue, onChange, onQuery, ...props }, ref) => {
  const mounted = useMounted()
  // avoid layout shift
  const rows = !mounted ? minRows : undefined

  return (
    <ReactTextareaAutoSize
      ref={ref}
      cacheMeasurements
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        "block", // 不加这个会导致高度超标
        "resize-none focus-visible:outline-none bg-transparent",
        className,
      )}
      maxRows={8}
      minRows={minRows}
      rows={rows}
      onChange={event => {
        // 更新用户的输入
        const value = event.currentTarget.value
        if (setValue) setValue(value)
        // console.log({ convId, value })
        if (onChange) onChange(event)
      }}
      onKeyDown={event => {
        if (onKeyDown) return onKeyDown(event)
        if (onQuery) {
          if (
            event.key === "Enter" &&
            !event.nativeEvent.isComposing &&
            !event.shiftKey &&
            !event.altKey
          ) {
            event.preventDefault()
            const value = event.currentTarget.value
            if (!value) return
            onQuery(value)
          }
        }
      }}
      {...props}
    />
  )
})
TextareaInner.displayName = "TextareaAuto"

export const TextareaWithAtom = forwardRef<
  HTMLTextAreaElement,
  ComponentProps<typeof TextareaInner> & { atom: Atom<string> }
>(({ atom, ...props }, ref) => {
  const [value, setValue] = useAtom(atom)
  return <TextareaInner ref={ref} setValue={setValue} value={value} {...props} />
})
TextareaWithAtom.displayName = "TextareaWithAtom"

export const TextareaAuto = forwardRef<
  HTMLTextAreaElement,
  ComponentProps<typeof TextareaInner> & { atom?: Atom<string> }
>(({ atom, ...props }, ref) => {
  return !atom ? (
    <TextareaInner ref={ref} {...props} />
  ) : (
    <TextareaWithAtom ref={ref} atom={atom} {...props} />
  )
})
TextareaAuto.displayName = "TextareaAuto"
