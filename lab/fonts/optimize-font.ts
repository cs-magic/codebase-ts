// optimize-font.ts

// Import your font data
import Fontmin from "fontmin"
import { japanese_colors as fontData } from "./japanese_colors.ts"

const srcPath =
  "/Volumes/homes/cs-magic/cs-magic-inner/assets/fonts/16_SourceHanSerifHK/SubsetOTF/HK/SourceHanSerifHK-Heavy.otf"

const destPath = "/Users/mark/coding/apps/totem-gen_mini_2/src/assets/fonts"

const loadTexts = () => {
  const chinese_words_list = fontData.map(item => item.Chinese_Name)
  // Get all unique characters by:
  // 1. Join all words into a single string
  // 2. Split into individual characters
  // 3. Create a Set to get unique characters
  // 4. Join back into a string
  const uniqueChars = [...new Set(chinese_words_list.join("").split(""))].join("")
  console.log("chars: ", uniqueChars.length)
  const n = 40
  for (let i = 0; i < uniqueChars.length; i += n) {
    console.log(uniqueChars.substring(i, i + n))
  }
  return uniqueChars
}

const text = loadTexts()

const fontmin = new Fontmin()
  .src(srcPath)
  // .use(
  //   Fontmin.glyph({
  //     text,
  //   }),
  // )
  // // 只保留常用字符
  // .use(
  //   Fontmin.glyph({
  //     text, // 替换为您需要的字符
  //     hinting: false, // 禁用 hinting 以减小体积
  //   }),
  // )
  // 转换为 woff2 格式
  // .use(Fontmin.ttf2woff2())
  .use(Fontmin.otf2ttf())
  .dest(destPath)

fontmin.run((err, files) => {
  if (err) {
    throw err
  }
  console.log("Font optimization completed!")
})
