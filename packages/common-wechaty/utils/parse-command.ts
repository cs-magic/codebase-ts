import { LiteralUnionSchema } from "../../common-common/schema"

export type IParseCommandRes<T extends string> = null | {
  command: T
  args: string
}

export const parseCommand = <T extends string>(
  text: string,
  commands: T[] | LiteralUnionSchema,
): IParseCommandRes<T> => {
  const ms =
    commands instanceof Array ? commands : commands.options.map((o) => o.value)

  // 正则使用 `` 而非 // 的时候要 \s --> \\s
  // - /A, ok
  // - /A b, ok
  // - /Ab, not ok
  const m = new RegExp(`^/(${ms.join("|")})(?:\\s+(.*?))?\\s*$`).exec(text)

  if (!m) return null

  const command = m[1] as T
  const args = (m[2] ?? "").trim()
  console.log({ text, command, args })
  return { command, args }
}
