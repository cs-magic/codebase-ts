export type LlmModelType = "chatgpt-3.5" | "chatgpt-4" | "kimi"

export interface LlmModel {
  id: LlmModelType
  title: string
}
