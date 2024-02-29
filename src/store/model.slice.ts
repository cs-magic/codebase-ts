import { ModelType, ScenarioType } from "@/schema/llm"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { devtools, persist } from "zustand/middleware"

export interface ModelSlice {
  scenarioType: ScenarioType
  setScenarioType: (scenarioType: ScenarioType) => void

  models: ModelType[]
  addModel: (model: ModelType) => void
  delModel: (model: ModelType) => void
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

        models: ["gpt-4"],
        addModel: (model) =>
          setState((state) => {
            state.models.push(model)
          }),
        delModel: (model) =>
          setState((state) => {
            state.models = state.models.filter((m) => m !== model)
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
