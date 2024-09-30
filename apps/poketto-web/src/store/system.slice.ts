import { MemoryMode, ModelType } from "@/ds"
import { FixedCacheQueue } from "@/lib/queue"
import { type StoreSlice } from "@/store/index"

/**
 * system | search for commands
 */
const searchQueue = new FixedCacheQueue(3)

export interface SystemState {
  searchHistory: string[]
  pushSearch: (v: string) => void

  modelType: ModelType
  setModelType: (v: ModelType) => void

  memoryMode: MemoryMode
  setMemoryMode: (v: MemoryMode) => void
}

export const createSystemSlice: StoreSlice<SystemState> = (setState, getState, store) => ({
  searchHistory: [],
  pushSearch: (v: string) =>
    setState((state) => {
      state.searchHistory = searchQueue.push(v)
    }),

  modelType: "gpt-3.5-turbo",
  setModelType: (v) =>
    setState((state) => {
      state.modelType = v
    }),

  memoryMode: "one-time",
  setMemoryMode: (v) =>
    setState((state) => {
      state.memoryMode = v
    }),
})
