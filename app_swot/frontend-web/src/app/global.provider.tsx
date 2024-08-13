"use client"

import { PropsWithChildren, Suspense } from "react"
import { useDisplayAutoHeight } from "@cs-magic/react-hooks/dist/hooks/use-display-auto-height.js"
import { SessionProvider } from "@cs-magic/react-ui/dist/providers/session.provider.js"
import { JotaiProvider } from "@cs-magic/react-ui/dist/providers/jotai.provider.js"
import { ThemeProvider } from "@cs-magic/react-ui/dist/providers/theme.provider.js"
import { ScreenProvider } from "@cs-magic/react-ui/dist/providers/screen.provider.js"
import { TooltipProvider } from "@cs-magic/react-ui/shadcn/ui/tooltip"

import { useEnhancedRouter } from "@cs-magic/next-hooks/dist/hooks/use-enhanced-router.js"

import { TRPCReactProvider } from "@/trpc/react"

export function GlobalHooksProvider({ children }: PropsWithChildren) {
  useDisplayAutoHeight()

  useEnhancedRouter()

  return <>{children}</>
}

export function GlobalProvider({ children }: PropsWithChildren) {
  return (
    // 1. data layer
    <Suspense>
      <JotaiProvider>
        <SessionProvider>
          <TRPCReactProvider>
            {/* 2. ui layer */}
            <ThemeProvider defaultTheme={"dark"} attribute={"class"}>
              <TooltipProvider>
                <ScreenProvider>
                  {/* 3. hooks layer */}
                  <GlobalHooksProvider>{children}</GlobalHooksProvider>
                </ScreenProvider>
              </TooltipProvider>
            </ThemeProvider>
          </TRPCReactProvider>
        </SessionProvider>
      </JotaiProvider>
    </Suspense>
  )
}
