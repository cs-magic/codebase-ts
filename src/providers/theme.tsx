"use client"

import { ThemeProvider } from "next-themes"
import { PropsWithChildren } from "react"

export default function ThemeProvider_({ children }: PropsWithChildren) {
  return <ThemeProvider defaultTheme={"dark"}>{children}</ThemeProvider>
}
