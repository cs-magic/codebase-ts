import { getOssUrl } from "@cs-magic/common/dist/oss/utils.js"
import { ICardInnerPreview, ICardPreview } from "@cs-magic/swot-backend/schema"
import { atom } from "jotai"
import { getOssKeyWithSuffix } from "../utils/get-oss-key-with-suffix"
import { cardUserAtom } from "./card.user.atom"
import { parseJsonSafe } from "@cs-magic/common/dist/utils/parse-json.js"

export const cardArticleUrlAtom = atom("")
// atomWithStorage("url.toParse", "")

export const cardInnerInputAtom = atom("")
// atomWithStorage("card.inner.input", "")

export const cardAuthorWithTitleAtom = atom(false)
// atomWithStorage("card.author.with-title", false,)

export const cardNewContentAtom = atom("")
// atomWithStorage("card.new.content", "")

///////////////////////////////
// derived
//////////////////////////////

export const cardPreviewAtom = atom<ICardPreview | null>((get) => {
  const user = get(cardUserAtom)
  const llmResponseInput = get(cardInnerInputAtom)
  const inner = parseJsonSafe<ICardInnerPreview>(llmResponseInput)

  console.log({ llmResponseInput, inner })
  return {
    outer: {
      // todo: use outer.id instead of inner.id
      id: inner?.id ?? "",
      user,
    },
    inner,
  }
})

export const cardOssAtom = atom((get) => {
  const preview = get(cardPreviewAtom)
  const id = preview?.inner?.id
  console.log("-- cardOssId: ", { preview, id })
  if (!id) return null
  const key = getOssKeyWithSuffix(id)
  return {
    id,
    key,
    url: getOssUrl(key, {}),
  }
})
