import { useTranslation } from "next-i18next";
import { ReactNode } from "react";

import { MarqueeContainer } from "@cs-magic/react/components/containers";

export function StatusItem({
  a,
  b,
  c,
}: {
  a: string;
  b: ReactNode;
  c?: ReactNode;
}) {
  return (
    <div className="w-24 mx-auto shrink-0 overflow-hidden | flex flex-col items-center justify-between gap-1 | whitespace-nowrap py-2">
      <div className="font-bold uppercase text-muted-foreground">{a}</div>
      <MarqueeContainer className="text-lg">{b}</MarqueeContainer>
      {c && (
        <div className="flex items-center justify-center text-primary-foreground/50">
          {c}
        </div>
      )}
    </div>
  );
}

export function InfoItem({ a, b }: { a: string; b: ReactNode }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="font-bold capitalize text-muted-foreground">{a}</div>
      <div className="text-primary-foreground/75">{b}</div>
    </div>
  );
}
