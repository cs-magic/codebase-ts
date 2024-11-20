// react.js - React 配置
module.exports = {
  env: {
    es2022: true,
    browser: true, // add browser support, e.g. window object
  },

  extends: [
    'eslint:recommended',
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "./typescript.js",
  ],
  plugins: ["react", "jsx-a11y"],
  settings: {
    react: {
      version: "detect",
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    // React 规则
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/jsx-sort-props": [
      "warn",
      {
        callbacksLast: true,
        shorthandFirst: true,
        reservedFirst: true,
      },
    ],
    "react-hooks/exhaustive-deps": "warn",

    // JSX 可访问性
    "jsx-a11y/anchor-is-valid": "warn",
    "jsx-a11y/click-events-have-key-events": "warn",
    'jsx-a11y/heading-has-content': 'warn',

    // 目前不会自动 fix
    // - [eslint-plugin-react/docs/rules/no-unescaped-entities.md at 4ef92b49ab70eacb913afa394209ac5a24522fad · jsx-eslint/eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react/blob/HEAD/docs/rules/no-unescaped-entities.md)
    // - [autofix for no-unescaped-entities · Issue #1537 · jsx-eslint/eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react/issues/1537)
    'react/no-unescaped-entities': [
      'warn',
      {
        forbid: [
          {
            char: '"',
            alternatives: ['{"\\""}']
          },
          {
            char: "'",
            alternatives: ["{'\\''}", "&apos;"]
          },
          {
            char: ">",
            alternatives: ["&gt;"]
          },
          {
            char: "}",
            alternatives: ["&#125;"]
          }
        ]
      }
    ]
  },
};
