import React from "react";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@cs-magic/shadcn/ui/dialog";

import { AppDetailView } from "@/components/app/detail.view";

export function AppDetailContainer({
  appId,
  open,
  onOpenChange,
  ...props
}: {
  appId: string;
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
} & React.ComponentPropsWithoutRef<typeof DialogTrigger>) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger {...props} />
      <DialogContent className="max-h-[80%] w-full overflow-auto sm:max-w-[60%]">
        <AppDetailView appId={appId} setOpen={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
}
