// setup/react.js - React 测试环境设置
import "@testing-library/jest-dom";
import { configure } from "@testing-library/react";

// 配置 testing-library
configure({
  testIdAttribute: "data-testid",
});

// 添加自定义匹配器
expect.extend({
  toBeValidDate(received) {
    const pass = received instanceof Date && !isNaN(received);
    return {
      pass,
      message: () => `expected ${received} to be a valid date`,
    };
  },
});
