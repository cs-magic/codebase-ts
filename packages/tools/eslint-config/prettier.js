// prettier.js - Prettier 集成配置
module.exports = {
  extends: ["plugin:prettier/recommended"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        singleQuote: false,
        semi: false,
        printWidth: 100,
        tabWidth: 2,
        trailingComma: "es5",
        bracketSpacing: true,
        endOfLine: "auto",
      },
    ],
  },
}
