// presets/next.js - Next.js 项目配置
const reactConfig = require("./react");

/** @type {import('jest').Config} */
module.exports = {
  ...reactConfig,
  moduleNameMapper: {
    ...reactConfig.moduleNameMapper,
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/pages/(.*)$": "<rootDir>/pages/$1",
    "^@/app/(.*)$": "<rootDir>/app/$1",
  },
  transform: {
    ...reactConfig.transform,
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
  },
  // 处理 Next.js 特定文件
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
};
