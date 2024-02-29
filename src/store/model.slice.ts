import { ModelType, ScenarioType } from "@/schema/llm"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { devtools, persist } from "zustand/middleware"

export interface ModelSlice {
  scenarioType: ScenarioType
  setScenarioType: (scenarioType: ScenarioType) => void

  modelName: ModelType
  setModelName: (modelName: ModelType) => void
  models: ModelType[]
  addModel: (model: ModelType) => void
  delModel: (model: ModelType) => void

  conversationId: string | null
  setConversationId: (v: string) => void
  cleanConversationId: () => void

  channelId: string | null
  setChannelId: (channelId: string | null) => void
}

export const useModelStore = create<ModelSlice>()(
  devtools(
    persist(
      immer((setState, getState, store) => ({
        scenarioType: "text2text",
        setScenarioType: (scenarioType) =>
          setState((state) => {
            state.scenarioType = scenarioType
          }),

        modelName: "gpt-3.5-turbo",
        setModelName: (modelName) =>
          setState((state) => {
            state.modelName = modelName
          }),

        models: ["gpt-4"],
        addModel: (model) =>
          setState((state) => {
            state.models.push(model)
          }),
        delModel: (model) =>
          setState((state) => {
            state.models = state.models.filter((m) => m !== model)
          }),

        conversationId: null,
        setConversationId: (v) =>
          setState((state) => {
            state.conversationId = v
          }),
        cleanConversationId: () =>
          setState((state) => {
            state.conversationId = null
          }),

        channelId: null,
        setChannelId: (channelId) =>
          setState((state) => {
            state.channelId = channelId
          }),
      })),
      {
        name: "v2agi",
        version: 0.1,
      },
    ),
  ),
)
