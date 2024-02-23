import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

export interface UiSlice {
  loading: boolean
  setLoading: (loading: boolean) => void
}

export const useUiStore = create<UiSlice>()(
  immer((setState, getState, store) => ({
    loading: false,
    setLoading: (loading) =>
      setState((state) => {
        state.loading = loading
      }),
  })),
)
