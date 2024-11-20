// node.js - Node.js 配置
module.exports = {
  extends: ["./typescript.js"],
  env: {
    node: true,
    browser: false,
  },
  rules: {
    // Node.js 特定规则
    "no-process-exit": "error",
    "no-path-concat": "error",
  },
}
