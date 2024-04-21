import { parseJs } from "@cs-magic/common/utils/parse-json";
import { IUserSummary } from "@cs-magic/prisma/schema/user.summary";
import { LlmResponse } from "@prisma/client";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { SummaryOptions } from "../../../../core/wechat/wxmp-article/fetch/approaches/nodejs/md2summary";
import {
  RequestApproachType,
  RequestOptions,
} from "../../../../core/wechat/wxmp-article/fetch/approaches/nodejs/requestPage";

import { BackendType } from "../../../../packages/llm/schema/llm";
import { LlmModelType } from "../../../../packages/llm/schema/providers";
import {
  CardPreviewEngineType,
  GenWxmpArticleCardFetchOptions,
  ICardPreview,
} from "../schema/card";
import { getCardUrl } from "../utils";

export const cardArticleUrlAtom = atomWithStorage("url.toParse", "");
export const llmResponseInputAtom = atomWithStorage("card.input", "");

export const cardUserIdAtom = atomWithStorage("card.user.id", "");
export const cardUserAvatarAtom = atomWithStorage("card.user.avatar", "");
export const cardUserNameAtom = atomWithStorage("card.user.name", "");

export const cardGeneratingAtom = atom(false);
export const cardResettingAtom = atom(false);
export const cardCopyingAtom = atom(false);
export const cardDownloadingAtom = atom(false);
export const cardUploadingAtom = atom(false);
export const cardMindmapRenderedAtom = atom(true);
export const cardCoverRenderedAtom = atom(false);
export const cardAuthorRenderedAtom = atom(false);
export const cardUserRenderedAtom = atom(false);

export const cardAuthorWithTitleAtom = atomWithStorage(
  "card.author.with-title",
  false,
);

export const cardNewContentAtom = atomWithStorage("card.new.content", "");

export const cardRefetchPageAtom = atomWithStorage("card.page.refetch", false);

export const summaryEnabledAtom = atomWithStorage<boolean>(
  "card.summary.enabled",
  true,
);

export const summaryWithImageAtom = atomWithStorage<boolean>(
  "card.summary.with-image",
  false,
);

export const summaryModelAtom = atomWithStorage<LlmModelType>(
  "card.summary.model",
  "gpt-3.5-turbo", // gpt-3.5-turbo
);
export const cardRefetchCardAtom = atomWithStorage("card.stat.refetch", false);
export const cardRefetchCommentsAtom = atomWithStorage(
  "card.comments.refetch",
  false,
);
export const cardFetchEngineAtom = atomWithStorage<BackendType>(
  "card.fetch-engine",
  "nodejs",
);

export const cardFetchWithCacheAtom = atomWithStorage<boolean>(
  "card.fetch.with-cache",
  true,
);

export const cardLLMTypeAtom = atomWithStorage<LlmModelType>(
  "card.llm.type",
  "gpt-3.5-turbo",
);

export const cardLLMEnabledAtom = atomWithStorage(
  "card.llm-model.enabled",
  true,
);

export const cardMdWithImgAtom = atomWithStorage("card.md-with-img", false);

export const cardPreviewEngineAtom = atomWithStorage<CardPreviewEngineType>(
  "card.preview.engine",
  "modern-screenshot",
);

export const backendTypeAtom = atomWithStorage<BackendType>(
  "backend.type",
  "nodejs",
);

export const requestApproachTypeAtom = atomWithStorage<RequestApproachType>(
  "request.approach.type",
  "simulate",
);

export const requestIsHeadlessAtom = atomWithStorage("request.headless", true);

///////////////////////////////
// derived
//////////////////////////////

/**
 * todo: parseJS ??
 */
export const cardPreviewAtom = atom<ICardPreview>((get) => {
  return parseJs<LlmResponse>(get(llmResponseInputAtom))?.response;
});

export const cardRenderedAtom = atom((get) => {
  const cover = get(cardCoverRenderedAtom);
  const mindmap = get(cardMindmapRenderedAtom);
  const user = get(cardUserRenderedAtom);
  const author = get(cardAuthorRenderedAtom);
  const rendered = cover && mindmap && user && author;
  console.log({ cover, mindmap, user, author, rendered });
  return rendered;
});

export const cardUserAtom = atom<IUserSummary>((get) => ({
  id: get(cardUserIdAtom),
  name: get(cardUserNameAtom),
  image: get(cardUserAvatarAtom),
}));

export const cardOssIdAtom = atom<string | null>((get) => {
  const preview = get(cardPreviewAtom);
  return getCardUrl(preview?.outer.id);
});

export const requestOptionsAtom = atom<RequestOptions>((get) => ({
  backendType: get(backendTypeAtom),
  approach: {
    type: get(requestApproachTypeAtom),
    headless: get(requestIsHeadlessAtom),
  },
}));

export const summaryOptionsAtom = atom<SummaryOptions>((get) => ({
  model: get(summaryModelAtom),
  enabled: get(summaryEnabledAtom),
  withImage: get(summaryWithImageAtom),
}));

export const cardGenOptionsAtom = atom<GenWxmpArticleCardFetchOptions>(
  (get) => ({
    stat: {
      enabled: false,
    },
    comments: {
      enabled: get(cardRefetchCommentsAtom),
    },
    withCache: get(cardFetchWithCacheAtom),
    detail: {
      request: get(requestOptionsAtom),
      llmResponse: get(summaryOptionsAtom),
    },
  }),
);
