# @cs-magic/eslint-config

CS Magic 项目的共享 ESLint 配置。

## 重要说明

1. 使用带有类型检查的规则会显著增加 ESLint 的运行时间。如果不需要这些规则，可以使用基础的 typescript 配置。

2. 确保在项目根目录有正确配置的 `tsconfig.json`。

3. 如果使用 monorepo，确保正确设置了 `parserOptions.project`：

```js
// 根目录 .eslintrc.js
module.exports = {
    root: true,
    extends: [
        '@cs-magic/eslint-config/typescript-type-checked',
        '@cs-magic/eslint-config/prettier',
    ],
    parserOptions: {
        project: ['./tsconfig.json', './packages/*/tsconfig.json'],
    },
    ignorePatterns: ['**/dist/**', '**/node_modules/**'],
}
```

4. 如果遇到性能问题，可以：
    - 使用 `.eslintignore` 排除不需要检查的文件
    - 使用基础的 typescript 配置而不是 typescript-type-checked
    - 在 CI 中使用类型检查，本地开发时使用基础配置

## 安装

```bash
npm install --save-dev @cs-magic/eslint-config
```

## 使用
## 使用

创建 `.eslintrc.js` 文件：

### JavaScript 项目

```js
module.exports = {
  extends: [
    '@cs-magic/eslint-config/base',
    '@cs-magic/eslint-config/prettier',
  ],
}
```

### TypeScript 项目（基础配置）

```js
// .eslintrc.js
module.exports = {
  extends: [
    '@cs-magic/eslint-config/typescript',
    '@cs-magic/eslint-config/prettier',
  ],
}
```

### TypeScript 项目（包含类型检查）

```js
// .eslintrc.js
module.exports = {
  extends: [
    '@cs-magic/eslint-config/typescript-type-checked',
    '@cs-magic/eslint-config/prettier',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
}
```

### React 项目

```js
module.exports = {
  extends: [
    '@cs-magic/eslint-config/react',
    '@cs-magic/eslint-config/prettier',
  ],
}
```

### Next.js 项目

```js
module.exports = {
  extends: [
    '@cs-magic/eslint-config/next',
    '@cs-magic/eslint-config/prettier',
  ],
  parserOptions: {
    project: './tsconfig.json', // 如果需要类型检查
  },
}
```

## 推荐的 .eslintignore

```text
node_modules
dist
build
coverage
.next
public
```

## 特性

- 基于最新的 ESLint 推荐规则
- TypeScript 支持
- React 和 React Hooks 规则
- Next.js 特定规则
- Node.js 环境优化
- Prettier 集成
- 导入顺序规范化
- JSX 可访问性检查

## 自定义规则

你可以在项目的 `.eslintrc.js` 中覆盖任何规则：

```js
module.exports = {
  extends: ['@cs-magic/eslint-config/react'],
  rules: {
    // 你的自定义规则
  },
}
```