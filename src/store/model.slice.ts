import { ScenarioType } from "@/schema/llm"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { devtools, persist } from "zustand/middleware"

import { IModel } from "@/schema/conversation"

export interface ModelSlice {
  scenarioType: ScenarioType
  setScenarioType: (scenarioType: ScenarioType) => void

  models: IModel[]
  setModels: (models: IModel[]) => void
  addModel: (model: IModel) => void
  delModel: (modelId: string) => void

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

        models: [],
        setModels: (models) =>
          setState((state) => {
            state.models = models
          }),
        addModel: (model) =>
          setState((state) => {
            state.models.push(model)
          }),
        delModel: (modelId) =>
          setState((state) => {
            state.models = state.models.filter((m) => m.id !== modelId)
          }),

        channelId: null,
        setChannelId: (channelId) =>
          setState((state) => {
            state.channelId = channelId
          }),
      })),
      {
        name: "v2agi",
        version: 0.2,
        migrate: (state, version) => {
          const s = state as ModelSlice
          if (version < 0.2) {
            s.models = []
          }
          return s
        },
      },
    ),
  ),
)
