// next.js - Next.js 配置
module.exports = {
  env: {
    es2022: true,
    browser: true,
    node: true,
  },

  extends: [
    "plugin:@next/next/recommended",
      "./react.js",
  ],
  rules: {
    // Next.js 特定规则
    "@next/next/no-html-link-for-pages": "error",
    "@next/next/no-img-element": "error",
  },
};
