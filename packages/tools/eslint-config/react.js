// react.js - React 配置
module.exports = {
  extends: [
    "./typescript",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  plugins: ["react", "jsx-a11y"],
  settings: {
    react: {
      version: "detect",
    },
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
  },
};
