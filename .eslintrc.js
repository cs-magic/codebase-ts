// 根目录 .eslintrc.js
module.exports = {
  root: true,
  extends: [
    "@cs-magic/eslint-config/node",
    "@cs-magic/eslint-config/typescript",
    // "@cs-magic/eslint-config/typescript-type-checked",
    "@cs-magic/eslint-config/prettier", // todo: compatability test
  ],
  parserOptions: {
    project: true,
  },
  ignorePatterns: [
    "**/dist/**",
    "**/node_modules/**", //".eslintrc.js"
  ],
}
