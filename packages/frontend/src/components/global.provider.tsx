"use client";

import { JotaiProvider } from "@/components/jotai.provider";
import { useEnhancedRouter } from "@/hooks/use-enhanced-router";
import { SessionProvider as NextSessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";

export const GlobalProvider = ({ children }: PropsWithChildren) => {
  // useDisplayAutoHeight(); // todo: 为什么这个会导致界面无法滚动

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
