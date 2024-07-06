import { parseJsonSafe } from "@cs-magic/common/utils/parse-json"
import { merge, omit } from "lodash"


import {
  defaultWechatData,
  defaultWechatPreference,
  IWechatData,
  IWechatPreference,
} from "../schema/bot.preference.js"

export const getRobustPreference = (
  row: {
    preference?: any
  } | null,
): IWechatPreference => {
  // migrate
  const rawPreference = omit(
    parseJsonSafe<IWechatPreference>(row?.preference),
    [
      "chatterEnabled",
      "parserEnabled",
      "model",
      "lang",
      "backend",
      "features.image",
    ],
  )

  // todo: merge 的最佳实践 【限制default schema】
  const preference = merge({ ...defaultWechatPreference }, rawPreference)
  // logger.debug(JSON.stringify({ rawPreference, preference }, null, 2))
  return preference
}

export const getRobustData = (
  row: {
    data?: any
  } | null,
): IWechatData => {
  return merge({ ...defaultWechatData }, parseJsonSafe<IWechatData>(row?.data))
}
