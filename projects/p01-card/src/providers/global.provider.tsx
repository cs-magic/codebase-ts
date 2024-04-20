"use client";
import { PropsWithChildren } from "react";
import { useDisplayAutoHeight } from "../../../../common/hooks/use-display-auto-height";
import { useEnhancedRouter } from "../../../../common/hooks/use-enhanced-router";

export default function GlobalProvider({ children }: PropsWithChildren) {
  useDisplayAutoHeight();

  useEnhancedRouter();

  return <>{children}</>;
}
