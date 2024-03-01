import { proxy } from "valtio"

export const uiState = proxy<{
  loading: boolean
  selectPAppsOpen: boolean
  selectPAppsOnOpenChange: (v: boolean) => void
}>({
  loading: false,
  selectPAppsOpen: false,
  selectPAppsOnOpenChange: (v) => {
    uiState.selectPAppsOpen = v
  },
})

export const openSelectPApps = () => uiState.selectPAppsOnOpenChange(true)
