// index.js - 基础配置
module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:import/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    "prefer-const": "warn",

    // 错误预防
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-debugger": "warn",
    "no-alert": "warn",

    // 最佳实践
    eqeqeq: ["error", "always"],
    "no-var": "error",
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

    // import 规范
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
        alphabetize: { order: "asc" },
      },
    ],
    "import/no-duplicates": "error",
  },
};
