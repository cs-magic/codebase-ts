# @cs-magic/eslint-config

CS Magic 项目的共享 ESLint 配置。

## 安装

```bash
npm install --save-dev @cs-magic/eslint-config
```

## 使用

### 基础配置

```js
// .eslintrc.js
module.exports = {
  extends: ['@cs-magic/eslint-config'],
}
```

### TypeScript 项目

```js
module.exports = {
  extends: ['@cs-magic/eslint-config/typescript'],
}
```

### React 项目

```js
module.exports = {
  extends: ['@cs-magic/eslint-config/react'],
}
```

### Next.js 项目

```js
module.exports = {
  extends: ['@cs-magic/eslint-config/next'],
}
```

### Node.js 项目

```js
module.exports = {
  extends: ['@cs-magic/eslint-config/node'],
}
```

### 与 Prettier 集成

```js
module.exports = {
  extends: [
    '@cs-magic/eslint-config/react', // 或其他配置
    '@cs-magic/eslint-config/prettier',
  ],
}
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