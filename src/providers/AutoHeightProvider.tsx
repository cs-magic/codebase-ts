"use client"

import { PropsWithChildren } from "react"
import { useAutoHeight } from "@/hooks/use-auto-height"

export default function AutoHeightProvider({ children }: PropsWithChildren) {
  useAutoHeight()

  return <>{children}</>
}
