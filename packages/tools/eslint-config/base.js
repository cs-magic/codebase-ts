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
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        pathGroups: [
          {
            pattern: "contentlayer/generated",
            group: "internal",
            position: "after",
          },
        ],
        "newlines-between": "always",
        alphabetize: { order: "asc" },
      },
    ],
  },

  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true, // project: "./tsconfig.json",
      },
    },
  },
}
