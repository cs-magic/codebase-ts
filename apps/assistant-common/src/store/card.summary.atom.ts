import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { LlmModelType } from "@cs-magic/llm";
import { SummaryOptions } from "@cs-magic/assistant-backend/schema/index";

export const cardLlmEnabledAtom = atomWithStorage<boolean>(
  "card.llm.enabled",
  true,
);
export const cardLlmModelTypeAtom = atomWithStorage<LlmModelType>(
  "card.summary.model",
  "gpt-3.5-turbo", // gpt-3.5-turbo
);
export const cardSummaryWithImageAtom = atomWithStorage<boolean>(
  "card.summary.with-image",
  false,
);

export const cardSummaryOptionsAtom = atom<SummaryOptions>((get) => ({
  model: get(cardLlmModelTypeAtom),
  enabled: get(cardLlmEnabledAtom),
  withImage: get(cardSummaryWithImageAtom),
}));
