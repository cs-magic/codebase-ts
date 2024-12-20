import { inspect } from "util"

import { SPLAT } from "triple-beam"
import { format } from "winston"

/**
 * 在 log 里，可以通过 [SPLAT] 获取到所有额外参数（第二个起）
 *
 * 然后使用 inspect 可以对其进行格式化（包括颜色）
 *
 * 根据gpt4，说颜色可以自定义，但实际不可以，不过是默认的颜色，也是不错的
 *
 * 通过这种方式，就不需要使用 flat + `%o` 的技术，将 object 插入到字符串（失去颜色）了
 *
 * ref: https://chat.openai.com/c/49e2e68b-b711-4716-99f3-e4388031bec0
 */
export const consoleLikeFormat = format.printf((info) => {
  let msg = `${info.timestamp} [${info.level}] ${info.message}`

  const args = info[SPLAT] as never[] | undefined

  args?.forEach((v) => {
    msg += ` ${inspect(v, {
      depth: null,
      colors: true,
    })}`
  })

  return msg
})
