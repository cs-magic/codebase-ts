import { proxy } from "valtio"

export const uiState = proxy<{ loading: boolean }>({ loading: false })
