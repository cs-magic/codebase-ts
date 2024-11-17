import React from "react"

import { Toaster } from "@cs-magic/shadcn/ui/sonner"

import { GlobalProvider } from "@/components/global.provider"
import { LoadingAlertDialog } from "@/components/loading"

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  // console.log(ansiColors.red("== RootLayout =="))

  return (
    <GlobalProvider>
      {children}

      <Toaster richColors position={"top-right"} duration={3000} closeButton={false} />

      <LoadingAlertDialog />

      {/*/!* 开发专用 *!/*/}
      {/*<Dev />*/}
    </GlobalProvider>
  )
}
