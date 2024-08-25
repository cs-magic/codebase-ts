module.exports = {
  printWidth: 120,
  semi: false,
  trailingComma: "all",

  // // Since prettier 3.0, manually specifying plugins is required
  // plugins: ['@ianvs/prettier-plugin-sort-imports'],
  // importOrder: ['^@cs-magic/(.*)$', '', '^@/(.*)$', '', '^[./]'],
  // importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  // importOrderTypeScriptVersion: '5.0.0',

  importOrder: [
    // 普通第三方依赖，不是 @cs-magic 不是 @/ 不是 ./ 不是 ../ 开头
    "^(?!@cs-magic|@/|\\./|\\.\\./).*",

    // @cs-magic 开头
    "^@cs-magic/.*?$",

    // todo: why this not work
    "^.prisma/.*?$",

    // 父级组件
    "^../.*?$",

    // 同级组件
    "^./.*?$",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ["@trivago/prettier-plugin-sort-imports"],
}
