import { useFullscreen } from "@mantine/hooks"

import { useAppStore } from "@/store"

export const useUniversalFullscreen = () => {
  const { ref, toggle, fullscreen: fullscreenUse } = useFullscreen()
  const { switchFullscreen, fullscreen: fullscreenStore } = useAppStore()
  const toggleAll = () => {
    const f = document.fullscreenEnabled ? toggle : switchFullscreen
    f()
  }
  const fullscreen = fullscreenStore || fullscreenUse
  // console.log({ fullscreen, fullscreenStore, fullscreenUse })
  return { fullscreen, toggle: toggleAll, ref }
}
