import { z } from "zod"
import { LangType } from "../../../packages-to-classify/i18n/schema"
import { Priority } from "../handle-messages/managers/todo.manager"

export const featureTypeSchema = z.enum(["system", "todo", "chatter", "parser"])
export type FeatureType = z.infer<typeof featureTypeSchema>

export const managerTypeSchema = z.enum(["base", ...featureTypeSchema.options])
export type ManagerType = z.infer<typeof managerTypeSchema>

export const quoteTypeSchema = z.enum(["parse", "recall"])
export type QuoteType = z.infer<typeof quoteTypeSchema>

export const commandsSchema = z.enum([
  "love",
  "ding",
  "status",
  "help",
  ...featureTypeSchema.options,
  ...quoteTypeSchema.options,
])
export type CommandType = z.infer<typeof commandsSchema>

export type FeatureMap<T extends string> = Record<
  LangType,
  {
    title: string
    description: string
    commands: Record<
      string,
      { type: T; description?: string; priority?: Priority }
    >
  }
>