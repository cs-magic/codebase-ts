"use client";

import { useAtomValue } from "jotai";
import React from "react";

import { AtomSelector } from "@cs-magic/react/components/atom-switcher";
import { StandardCard } from "@cs-magic/react/components/standard-card";
import { useSearchParam } from "@cs-magic/react/hooks/use-search-param";
import { cn } from "@cs-magic/shadcn/lib/utils";
import { Separator } from "@cs-magic/shadcn/ui/separator";
import {
  GenCardApproach,
  cardPreviewEngineTypeSchema,
} from "@cs-magic/assistant-backend/schema/card";
import { CardInputBackend } from "@/components/card-input-backend";
import { CardInputFrontend } from "@/components/card-input-frontend";
import { cardPreviewAtom } from "@/store/card.atom";
import { cardPreviewEngineAtom } from "@/store/card.rendered.atom";

import { CardPreviewContainer } from "./card-preview-container";

export const Card = () => {
  const preview = useAtomValue(cardPreviewAtom);
  const renderType =
    useSearchParam<GenCardApproach>("renderType") ?? "frontend";

  const Input = renderType === "backend" ? CardInputBackend : CardInputFrontend;
  // const Input = CardInputFrontend

  console.log({ preview });

  return (
    <div
      className={cn(
        "mx-auto grid h-full w-full grid-cols-1 gap-4 overflow-auto p-2 sm:grid-cols-2 sm:p-4",
      )}
    >
      <StandardCard title={"Input Control"}>{<Input />}</StandardCard>

      <StandardCard title={"Preview"} id={"card-previews"}>
        <AtomSelector
          atom={cardPreviewEngineAtom}
          name={"preview-engine"}
          vs={cardPreviewEngineTypeSchema.options}
        />

        <Separator orientation={"horizontal"} />

        <CardPreviewContainer
          genCardApproach={renderType}
          preview={preview}
          withActions
        />
      </StandardCard>
    </div>
  );
};

export default Card;
