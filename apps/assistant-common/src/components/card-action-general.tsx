"use client";

import { PrimitiveAtom, atom, useAtom } from "jotai";
import capitalize from "lodash/capitalize";
import { HTMLAttributes } from "react";

import { ButtonWithLoading } from "@cs-magic/react/components/button-with-loading";
import { cn } from "@cs-magic/shadcn/lib/utils";
import { ActionType } from "@cs-magic/assistant-backend/schema/index";

import {
  cardCopyingAtom,
  cardDownloadingAtom,
  cardGeneratingAtom,
  cardResettingAtom,
  cardUploadingAtom,
} from "../store/card.actions.atom";

export const GeneralCardAction = ({
  disabled,
  type,
  action,
  className,
  onClick,
  ...props
}: {
  action: (type: ActionType) => Promise<void>;
  disabled?: boolean;
  type: ActionType;
} & HTMLAttributes<HTMLButtonElement>) => {
  const atomMap: Record<ActionType, PrimitiveAtom<boolean>> = {
    generate: cardGeneratingAtom,
    copy: cardCopyingAtom,
    download: cardDownloadingAtom,
    upload: cardUploadingAtom,
    reset: cardResettingAtom,
  };

  const [v, setV] = useAtom(atomMap[type]);

  return (
    <ButtonWithLoading
      id={`${type}-card`}
      className={cn("w-24", className)}
      size={"sm"}
      loading={v}
      disabled={disabled}
      onClick={async () => {
        setV(true);
        // await sleep(3000)
        await action(type).finally(() => {
          setV(false);
        });
      }}
      {...props}
    >
      {capitalize(type)}
    </ButtonWithLoading>
  );
};
