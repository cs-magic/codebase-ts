import { CardsLayoutType } from "@/ds"
import { type StoreSlice } from "@/store/index"

export interface UIState {
  cardsLayout: CardsLayoutType
  setCardsLayout: (v: CardsLayoutType) => void

  fullscreen: boolean
  switchFullscreen: () => void

  searchOpen: boolean
  setSearchOpen: (v: boolean) => void
}

export const createUISlice: StoreSlice<UIState> = (setState, getState, store) => ({
  cardsLayout: CardsLayoutType.masonry,
  setCardsLayout: (v) =>
    setState((state) => {
      state.cardsLayout = v
    }),
  fullscreen: false,
  switchFullscreen: () =>
    setState((state) => {
      state.fullscreen = !state.fullscreen
    }),

  searchOpen: false,
  setSearchOpen: (v) =>
    setState((state) => {
      state.searchOpen = v
    }),
})
