import { GlobalProvider } from "@/components/global.provider";
import { LoadingAlertDialog } from "@/components/loading";
import { Toaster } from "@cs-magic/shadcn/ui/sonner";
import React from "react";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // console.log(ansiColors.red("== RootLayout =="))

  return (
    <GlobalProvider>
      {children}

      <Toaster
        richColors
        position={"top-right"}
        duration={3000}
        closeButton={false}
      />

      <LoadingAlertDialog />

      {/*/!* 开发专用 *!/*/}
      {/*<Dev />*/}
    </GlobalProvider>
  );
}
