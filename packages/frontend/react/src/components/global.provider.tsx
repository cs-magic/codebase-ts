"use client";

import { JotaiProvider } from "@/components/jotai.provider";
import { ScreenProvider } from "@/components/screen.provider";
import { useDisplayAutoHeight, useDisplayAutoScrollTop } from "@/hooks";
import { useEnhancedRouter } from "@/hooks/use-enhanced-router";
import { SessionProvider as NextSessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";

export const GlobalProvider = ({ children }: PropsWithChildren) => {
  // useDisplayAutoHeight();

  // useDisplayAutoScrollTop() // todo: fix scroll error

  useEnhancedRouter();

  return (
    // 1. data layer
    <NextSessionProvider>
      <JotaiProvider>
        {/*<TRPCReactProvider>*/}
        {/* 2. ui layer */}
        <ThemeProvider attribute={"class"}>
          {/*<ScreenProvider>*/}
          {children}
          {/*</ScreenProvider>*/}
        </ThemeProvider>
        {/*</TRPCReactProvider>*/}
      </JotaiProvider>
    </NextSessionProvider>
  );
};
