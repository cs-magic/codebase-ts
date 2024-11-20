// typescript-type-checked.js - 需要类型信息的规则配置
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    './typescript.js',
  ],
  rules: {
    // 需要类型检查的规则
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/restrict-template-expressions': 'error',
    '@typescript-eslint/unbound-method': 'error',
  },
}
