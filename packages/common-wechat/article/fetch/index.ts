"use server"

import { Prisma } from "@prisma/client"
import { fetchWechatArticleSummary } from "./summary"
import { IFetchWechatArticleSummaryConfig } from "./summary/schema"
import { fetchWechatArticleDetail } from "./detail"
import { IFetchWechatArticleDetailConfig } from "./detail/schema"
import WechatArticleUncheckedCreateInput = Prisma.WechatArticleUncheckedCreateInput

export const fetchWechatArticle = async (
  id: string,
  summaryConfig?: IFetchWechatArticleSummaryConfig,
  detailConfig?: IFetchWechatArticleDetailConfig,
): Promise<WechatArticleUncheckedCreateInput> => {
  const content = await fetchWechatArticleSummary(id, summaryConfig)
  const detail = await fetchWechatArticleDetail(id, detailConfig)

  return {
    id,
    ...content,
    ...detail,
  }
}
