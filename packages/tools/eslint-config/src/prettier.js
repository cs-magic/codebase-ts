// prettier.js - Prettier 集成配置
const prettierConfig = require("@cs-magic/prettier-config")
const merge = require("lodash/merge")

module.exports = {
  extends: ["plugin:prettier/recommended"],
  rules: {
    "prettier/prettier": [
      "error",
      merge(prettierConfig, {
        importOrder: null,
      }),
    ],
  },
}
