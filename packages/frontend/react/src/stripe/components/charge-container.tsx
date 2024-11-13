import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "packages/frontend/frontend-shadcn/src/ui/dialog";
import StripePricingTable from "@/stripe/components/pricing-table";

export function ChargeContainer(
  props: React.ComponentPropsWithoutRef<typeof DialogTrigger>,
) {
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <DialogContent className="w-full max-w-[1080px] max-h-[80vh] overflow-auto">
        <StripePricingTable />
      </DialogContent>
    </Dialog>
  );
}