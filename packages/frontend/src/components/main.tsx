"use client";

import { navbarHeightAtom } from "@/store";
import { cn } from "@cs-magic/shadcn/lib/utils";
import { useAtom } from "jotai";
import React, { PropsWithChildren } from "react";

export const Main = ({ children }: PropsWithChildren) => {
  const [navbarHeight] = useAtom(navbarHeightAtom);

  console.log({ navbarHeight });

  return (
    <main
      className={cn("relative center transition-all duration-300")}
      style={{
        // svh 让我快乐，可以完美支持 safari 居中的效果，see at:
        // - https://www.reddit.com/r/css/comments/12mh0ac/comment/jgggl42/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button
        // - https://dev.to/frehner/css-vh-dvh-lvh-svh-and-vw-units-27k4
        minHeight: `calc(100svh - ${navbarHeight}px)`,
      }}
    >
      {navbarHeight ? children : null}
    </main>
  );
};
