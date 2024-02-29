"use server"

import { api } from "@/trpc/server"

export const createConversation = api.llm.createConversation.mutate
