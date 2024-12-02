// optimize-font.ts

// Import your font data
import Fontmin from "fontmin"
import fs from "fs"
import path from "path"
import { japanese_colors as fontData } from "./japanese_colors.ts"

// 修改为文件夹路径
const srcDir =
  "/Volumes/homes/cs-magic/cs-magic-inner/assets/fonts/16_SourceHanSerifHK/SubsetOTF/HK"
const destPath = "/Users/mark/coding/apps/totem-gen_mini_2/src/assets/fonts"

const loadTexts = () => {
  const chinese_words_list = fontData.map(item => item.Chinese_Name)
  const uniqueChars = [...new Set(chinese_words_list.join("").split(""))].join("")
  console.log("Total unique characters:", uniqueChars.length)
  const n = 40
  for (let i = 0; i < uniqueChars.length; i += n) {
    console.log(uniqueChars.substring(i, i + n))
  }
  return uniqueChars
}

const text = loadTexts()

// 处理单个字体文件
const processFont = (srcPath: string) => {
  const fileName = path.basename(srcPath)
  console.log(`Processing font: ${fileName}...`)

  const fontmin = new Fontmin()
    .src(srcPath)
    .use(
      Fontmin.otf2ttf({
        text,
      }),
    )
    .use(Fontmin.ttf2woff2())
    .dest(destPath)

  return new Promise((resolve, reject) => {
    fontmin.run((err, files) => {
      if (err) {
        reject(err)
        return
      }
      console.log(`Completed processing: ${fileName}`)
      resolve(files)
    })
  })
}

// 主函数：处理文件夹中的所有字体文件
const processFontDirectory = async () => {
  try {
    // 读取源目录中的所有文件
    const files = fs.readdirSync(srcDir)
    const fontFiles = files.filter(
      file => file.toLowerCase().endsWith(".otf") || file.toLowerCase().endsWith(".ttf"),
    )

    console.log(`Found ${fontFiles.length} font files to process`)

    // 依次处理每个字体文件
    for (const file of fontFiles) {
      const srcPath = path.join(srcDir, file)
      await processFont(srcPath)
    }

    console.log("All fonts have been processed successfully!")
  } catch (error) {
    console.error("Error processing fonts:", error)
  }
}

// 执行主函数
processFontDirectory()
