import { ELLIPSE } from "@/const"
import { isAscii } from "@/utils/is-ascii"

export const truncateString = (s: string, asciiMaxLen = 20, ellipse = ELLIPSE) => {
  let index = 0
  let sum = 0
  for (const c of s) {
    sum += isAscii(c) ? 1 : 2
    if (sum > asciiMaxLen) break
    ++index
  }
  return index === s.length ? s : s.slice(0, index) + ellipse
}
