"use client";

import { useSetAtom } from "jotai";
import React, { type PropsWithChildren, useEffect } from "react";
import { useMeasure } from "react-use";

import { uiScreenAtom } from "@/store/ui.atom";

export const ScreenProvider = ({ children }: PropsWithChildren) => {
  const [ref, { width, height }] = useMeasure<HTMLDivElement>();

  const setMainArea = useSetAtom(uiScreenAtom);

  useEffect(() => {
    setMainArea({ width, height });
    // console.log({ width, height })
  }, [width, height]);

  // return children;

  return (
    <div ref={ref} className={"w-full h-full"} id={"screen-measure"}>
      {children}
    </div>
  );
};
