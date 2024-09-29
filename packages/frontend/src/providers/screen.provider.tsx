"use client";

import { useSetAtom } from "jotai";
import React, { PropsWithChildren, useEffect } from "react";
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
    <div id={"screen-measure"} ref={ref}>
      {children}
    </div>
  );
};
