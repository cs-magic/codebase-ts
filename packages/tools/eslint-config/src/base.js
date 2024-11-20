// base.js - 基础 JavaScript 规则
module.exports = {
  env: {
    es2022: true,
  },

  extends: ["eslint:recommended", "plugin:import/recommended"],

  rules: {
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-debugger": "warn",
    "no-alert": "warn",
    "no-var": "error",
    "prefer-const": "error",
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "import/order": "off",
  },

  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true, // project: "./tsconfig.json",
      },
    },
  },
}
