export type SelectorItem<T = string> = {
  id: T
  title: string
  children?: SelectorItem<T>[]
}

export type ScenarioType =
  | "text2text"
  | "text2image"
  | "text2video"
  | "text2music"
  | "image2image"

export type Scenario = SelectorItem<ScenarioType>

export type CompanyId = "openai" | "moonshot"

/**
 * ref: https://github.com/openai/openai-python/issues/952#issuecomment-1857207339
 */
export type OpenAIModelType =
  | "gpt-4-1106-preview"
  | "gpt-4-vision-preview"
  | "gpt-4"
  | "gpt-4-0314"
  | "gpt-4-0613"
  | "gpt-4-32k"
  | "gpt-4-32k-0314"
  | "gpt-4-32k-0613"
  | "gpt-3.5-turbo-1106"
  | "gpt-3.5-turbo"
  | "gpt-3.5-turbo-16k"
  | "gpt-3.5-turbo-0301"
  | "gpt-3.5-turbo-0613"
  | "gpt-3.5-turbo-16k-0613"

export type ModelType = OpenAIModelType | "kimi"

export type Model = SelectorItem<string>
