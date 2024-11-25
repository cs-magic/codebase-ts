// index.js - 基础配置
module.exports = {
  // 基本配置
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: false,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "avoid",
  endOfLine: "lf",

  // 文件相关
  embeddedLanguageFormatting: "auto",

  // 特殊语法
  htmlWhitespaceSensitivity: "css",

  // 自动插入 @format 标记
  insertPragma: false,
  requirePragma: false,

  // trailingComma: 'es5',
  trailingComma: "all",

  /// import order
  // // Since prettier 3.0, manually specifying plugins is required
  // plugins: ['@ianvs/prettier-plugin-sort-imports'],
  // importOrder: ['^@cs-magic/(.*)$', '', '^@/(.*)$', '', '^[./]'],
  // importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  // importOrderTypeScriptVersion: '5.0.0',
  importOrder: [
    // 第三方依赖
    "^[^@\\.]",

    // 内部包
    "^@cs-magic/",
    "^@/",

    // 相对路径
    "^\\.\\./*",
    "^\\./*",

    // 样式文件
    "^.*\\.(css|scss|sass|less|styl)$",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ["@trivago/prettier-plugin-sort-imports", "prettier-plugin-organize-imports"],
}
