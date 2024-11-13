// next.js - Next.js 配置
module.exports = {
  extends: ["./react", "plugin:@next/next/recommended"],
  rules: {
    // Next.js 特定规则
    "@next/next/no-html-link-for-pages": "error",
    "@next/next/no-img-element": "error",
  },
};
