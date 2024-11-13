// presets/react.js - React 项目配置
const baseConfig = require("../index");

/** @type {import('jest').Config} */
module.exports = {
  ...baseConfig,
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [require.resolve("../setup/react.js")],
  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": require.resolve(
      "../transformers/file.js",
    ),
  },
  transform: {
    ...baseConfig.transform,
    "^.+\\.svg$": require.resolve("../transformers/svg.js"),
  },
};
