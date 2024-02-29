import { ScenarioType } from "@/schema/llm"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { devtools, persist } from "zustand/middleware"

export interface ModelSlice {
  scenarioType: ScenarioType
  setScenarioType: (scenarioType: ScenarioType) => void

  pAppIds: string[]
  setPAppIds: (ids: string[]) => void
  addPAppId: (id: string) => void
  delPAppId: (id: string) => void

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

        pAppIds: ["gpt-3.5-turbo"],
        setPAppIds: (ids) =>
          setState((state) => {
            state.pAppIds = ids
          }),
        addPAppId: (id) =>
          setState((state) => {
            state.pAppIds.push(id)
          }),
        delPAppId: (id) =>
          setState((state) => {
            state.pAppIds = state.pAppIds.filter((m) => m !== id)
          }),

        channelId: null,
        setChannelId: (channelId) =>
          setState((state) => {
            state.channelId = channelId
          }),
      })),
      {
        name: "v2agi",
        version: 0.4,
        migrate: (state, version) => {
          const s = state as ModelSlice
          if (version < 0.4) {
            s.pAppIds = ["gpt-3.5-turbo"]
          }
          return s
        },
      },
    ),
  ),
)
