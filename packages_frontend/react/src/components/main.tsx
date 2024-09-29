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
      className={cn("relative flex flex-col justify-center items-center")}
      style={{
        minHeight: `calc(100vh - ${navbarHeight}px)`,
      }}
    >
      {children}
    </main>
  );
};
