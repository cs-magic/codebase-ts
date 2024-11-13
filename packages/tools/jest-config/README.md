# @cs-magic/jest-config

CS Magic 项目的共享 Jest 配置。

## 安装

```bash
npm install --save-dev @cs-magic/jest-config
```

## 使用

### 基础配置

```js
// jest.config.js
module.exports = require('@cs-magic/jest-config')
```

### React 项目

```js
// jest.config.js
module.exports = require('@cs-magic/jest-config/presets/react')
```

### Next.js 项目

```js
// jest.config.js
module.exports = require('@cs-magic/jest-config/presets/next')
```

### 自定义配置

```js
// jest.config.js
const baseConfig = require('@cs-magic/jest-config/presets/react')

module.exports = {
  ...baseConfig,
  // 你的自定义配置
  testTimeout: 10000,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}
```

## 特性

- TypeScript 支持
- React Testing Library 集成
- 用户事件模拟
- 文件模块模拟
- 自定义匹配器
- 代码覆盖率报告

## 测试示例

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MyComponent } from './MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
```

## 命令

在 `package.json` 中添加：

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

## 常见问题

### 1. 测试超时

修改超时时间：

```js
module.exports = {
  ...require('@cs-magic/jest-config'),
  testTimeout: 10000,
}
```

### 2. 模拟模块

```js
jest.mock('./myModule', () => ({
  myFunction: jest.fn(),
}))
```

### 3. 自定义转换器

```js
module.exports = {
  ...require('@cs-magic/jest-config'),
  transform: {
    '^.+\\.mdx?$': '@mdx-js/jest-transformer',
  },
}
```