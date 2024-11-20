// node.js - Node.js 配置
module.exports = {
  extends: ["./base.js"],
  env: {
    es2022: true,
    node: true,
  },
  rules: {
    // Node.js 特定规则
    "no-process-exit": "error",
    "no-path-concat": "error",
  },
}
