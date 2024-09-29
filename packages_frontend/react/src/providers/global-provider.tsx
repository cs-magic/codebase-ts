"use client";

import { useDisplayAutoHeight } from "@/hooks/use-display-auto-height";
import { useEnhancedRouter } from "@/hooks/use-enhanced-router";
import { JotaiProvider } from "@/providers/jotai.provider";
import { ThemeProvider } from "@/providers/theme.provider";
import { SessionProvider as NextSessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

export const GlobalProvider = ({ children }: PropsWithChildren) => {
  useDisplayAutoHeight();

  useEnhancedRouter();

  return (
    // 1. data layer
    <NextSessionProvider>
      <JotaiProvider>
        {/*<TRPCReactProvider>*/}
        {/* 2. ui layer */}
        <ThemeProvider defaultTheme={"dark"} attribute={"class"}>
          {/*<ScreenProvider>*/}
          {children}
          {/*</ScreenProvider>*/}
        </ThemeProvider>
        {/*</TRPCReactProvider>*/}
      </JotaiProvider>
    </NextSessionProvider>
  );
};
