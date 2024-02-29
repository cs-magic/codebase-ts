"use server"

import { api } from "@/trpc/server"
import { ICreateConversation } from "@/schema/conversation"

/**
 * server action 必须一个个导出 function，不能使用以下，否则会报错
 * export const listConversations = api.llm.listConversations.query
 */
export const listConversations = async () => api.llm.listConversations.query()
export const createConversation = async (data: ICreateConversation) =>
  api.llm.createConversation.mutate(data)
