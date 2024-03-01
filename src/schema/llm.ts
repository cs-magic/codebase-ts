export type ScenarioType =
  | "text2text"
  | "text2image"
  | "text2video"
  | "text2music"
  | "image2image"

export type CompanyId = "openai" | "moonshot"

/**
 * ref: https://github.com/openai/openai-python/issues/952#issuecomment-1857207339
 */
export type OpenAIModelType = "gpt-3.5-turbo" | "gpt-4" | "gpt-4-32k"
