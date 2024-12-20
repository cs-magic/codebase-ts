import type { IDimension } from "@cs-magic/common/schema/ui"
import { atom } from "jotai"


/**
 * alert dialog for loading
 */
export const uiLoadingAlertDialogAtom = atom(false)
/**
 * main-area
 */
export const uiScreenAtom = atom<IDimension>({ width: 0, height: 0 })
/**
 * alert dialog with content
 */
export const uiAlertDialogOpen = atom(false)
export const uiAlertDialogContent = atom("")
export const openAlertDialogAtom = atom(null, (get, set, content: string) => {
  set(uiAlertDialogOpen, true)
  set(uiAlertDialogContent, content)
})
export const uiMobileSidebarOpen = atom(false)
export const uiInnerHeight = atom<null | number>(null)
export const uiViewportHeight = atom<number | null>(null)
export const isSoftKeyboardOn = atom(get => (get(uiInnerHeight) ?? 0) < get(uiScreenAtom).height)

/**
 * navbar 高度，用于 main 占满
 */
export const navbarHeightAtom = atom(0)
