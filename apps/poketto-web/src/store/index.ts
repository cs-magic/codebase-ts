import { type StateCreator, create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

import { type SystemState, createSystemSlice } from "@/store/system.slice"
import { type UIState, createUISlice } from "@/store/ui.slice"

/**
 * store
 */
export type StoreState = UIState & SystemState

export type StoreSlice<T> = StateCreator<
  StoreState,
  [["zustand/devtools", never], ["zustand/persist", unknown], ["zustand/immer", never]],
  [],
  T
>

export const useAppStore = create<StoreState>()(
  devtools(
    persist(
      immer((...a) => ({
        ...createUISlice(...a),
        ...createSystemSlice(...a),
      })),
      {
        name: "zustand",
        version: 1.0,
        // @ts-ignore
        migrate: (persistedState: StoreState, version) => {
          if (version === 0.9) {
            // 大版本重构 (prisma)
            // @ts-ignore
            delete persistedState.app
            // @ts-ignore
            delete persistedState.pokettos
            // @ts-ignore
            delete persistedState.appComments
            // @ts-ignore
            delete persistedState.appMessages
          }
          return persistedState
        },
      },
    ),
  ),
)
