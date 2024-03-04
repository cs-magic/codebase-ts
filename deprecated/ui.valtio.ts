// import { proxy } from "valtio"
// import { BEST_VIEWPOINT } from "@/config/system"
//
// import { IDisplay } from "@/common/schema/ui"
//
// export interface UIState {
//   mainArea: IDisplay
//   loading: boolean
//   alertDialog: {
//     open: boolean
//     content: string
//   }
//   selectPAppsOpen: boolean
//   selectPAppsOnOpenChange: (v: boolean) => void
//
//   // compute
//   maxToAdd: number
// }
//
// export const uiState = proxy<UIState>({
//   mainArea: {
//     width: 0,
//     height: 0,
//   },
//   alertDialog: {
//     open: false,
//     content: "",
//   },
//   loading: false,
//   selectPAppsOpen: false,
//   selectPAppsOnOpenChange: (v) => {
//     uiState.selectPAppsOpen = v
//   },
//
//   get maxToAdd() {
//     return Math.max(
//       Math.floor(
//         (this.mainArea.height * this.mainArea.width) /
//           BEST_VIEWPOINT /
//           BEST_VIEWPOINT /
//           2,
//       ),
//       2, // se: 375x667
//     )
//   },
// })