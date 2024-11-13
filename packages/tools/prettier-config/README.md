# @cs-magic/prettier-config

CS Magic 项目的共享 Prettier 配置。

## 安装

```bash
npm install --save-dev @cs-magic/prettier-config
```

## 使用

### 基础配置

在 `package.json` 中：
```json
{
  "prettier": "@cs-magic/prettier-config"
}
```

或者在 `.prettierrc.js` 中：
```js
module.exports = require('@cs-magic/prettier-config')
```

### TypeScript 项目

```js
// .prettierrc.js
module.exports = require('@cs-magic/prettier-config/typescript')
```

### Tailwind CSS 项目

```js
// .prettierrc.js
module.exports = require('@cs-magic/prettier-config/tailwind')
```

### 与 ESLint 集成

如果你使用 `@cs-magic/eslint-config`，已经包含了 Prettier 配置。只需在 `.eslintrc.js` 中：

```js
module.exports = {
  extends: [
    '@cs-magic/eslint-config/react', // 或其他配置
    '@cs-magic/eslint-config/prettier',
  ],
}
```

如果你想单独集成：

1. 安装依赖：
```bash
npm install --save-dev eslint-config-prettier eslint-plugin-prettier
```

2. 配置 ESLint：
```js
// .eslintrc.js
module.exports = {
  extends: [
    // 其他配置...
    'plugin:prettier/recommended',
  ],
}
```

## 自定义配置

创建 `.prettierrc.js` 文件来覆盖默认配置：

```js
module.exports = {
  ...require('@cs-magic/prettier-config'),
  // 你的自定义配置
  semi: true,
  tabWidth: 4,
}
```

## 配置说明

### 基础配置特点

- 行宽限制：100 字符
- 使用空格而非 Tab
- 无分号
- 单引号
- ES5 尾逗号
- 箭头函数参数自动括号

### TypeScript 配置特点

- 自动组织导入语句
- 预设的导入顺序规则
- 分组之间自动添加空行

### Tailwind 配置特点

- 类名自动排序
- 支持多种类名属性
- 支持常用的工具函数

## 常见问题

### 1. 格式化特定文件

```bash
prettier --write "src/**/*.{js,jsx,ts,tsx}"
```

### 2. 检查格式是否正确

```bash
prettier --check "src/**/*.{js,jsx,ts,tsx}"
```

### 3. 在 VS Code 中使用

1. 安装 Prettier 插件
2. 设置为默认格式化工具：
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```