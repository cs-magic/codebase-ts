import { IModel, Model, ModelType, Scenario } from "@/schema/llm"

export const scenarios: Scenario[] = [
  { id: "text2text", title: "文生文" },
  { id: "text2image", title: "文生图" },
  { id: "text2video", title: "文生视频" },
  { id: "text2music", title: "文生音乐" },
  { id: "image2image", title: "图生图" },
]

export const supportedModels: Record<ModelType, IModel> = {
  "gpt-3.5-turbo": {
    id: "gpt-3.5-turbo",
    title: "ChatGPT 3.5",
    company: "openai",
  },
  "gpt-4": { id: "gpt-4", title: "ChatGPT 4", company: "openai" },
  "gpt-4-32k": { id: "gpt-4-32k", title: "ChatGPT 4 (32K)", company: "openai" },
  kimi: { id: "kimi", title: "Kimi Chat", company: "moonshot" },
}

export const llmModels: Model[] = [
  {
    id: "openai",
    title: "Open AI",
    children: [
      {
        id: "gpt-3.5-turbo",
        title: "ChatGPT 3.5",
      },
      {
        id: "gpt-4",
        title: "ChatGPT 4",
      },
      {
        id: "gpt-4-32k",
        title: "ChatGPT 4 (32K)",
      },
    ],
  },
  {
    id: "moonshot",
    title: "月之暗面",
    children: [
      {
        id: "kimi",
        title: "Kimi",
      },
    ],
  },
  {
    id: "thu-wangguan",
    title: "王冠",
    children: [
      {
        id: "openchat-3.5",
        title: "Open Chat 3.5",
      },
    ],
  },
]
