// index.js - 基础配置
const path = require("path");

/** @type {import('jest').Config} */
module.exports = {
  // 默认测试环境
  testEnvironment: "node",

  // 测试文件匹配模式
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],

  // 覆盖率收集
  collectCoverageFrom: [
    "src/**/*.[jt]s?(x)",
    "!src/**/*.d.ts",
    "!src/**/*.stories.[jt]s?(x)",
    "!src/**/*.test.[jt]s?(x)",
    "!src/**/__tests__/**/*.[jt]s?(x)",
  ],

  // 转换器配置
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },

  // 模块名映射
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  // 全局变量
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
};
