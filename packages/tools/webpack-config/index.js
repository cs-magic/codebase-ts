// index.js
const { merge } = require("webpack-merge");
const developmentConfig = require("./presets/webpack.development");
const productionConfig = require("./presets/webpack.production");

module.exports = (env = {}) => {
  const configs = [];

  // 基础配置
  configs.push(require("./presets/webpack.common"));

  // 环境配置
  if (env.development) {
    configs.push(developmentConfig);
  } else if (env.production) {
    configs.push(productionConfig);
  }

  // 框架配置
  if (env.react) {
    configs.push(require("./presets/webpack.react"));
  }

  // TypeScript 配置
  if (env.typescript) {
    configs.push(require("./presets/webpack.typescript"));
  }

  return merge(configs);
};
