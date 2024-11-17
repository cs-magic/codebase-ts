# @cs-magic/ts-config

共享的 TypeScript 配置文件，用于 CS Magic 项目。

## 安装

```bash
npm install --save-dev @cs-magic/ts-config
# 或
yarn add -D @cs-magic/ts-config
```

## 使用

### 浏览器环境

```json
{
  "extends": "@cs-magic/ts-config/dom"
}
```

### Node.js 环境

```json
{
  "extends": "@cs-magic/ts-config/node"
}
```

### 自定义配置

你可以继承基础配置并添加自己的设置：

```json
{
  "extends": "@cs-magic/ts-config/dom",
  "compilerOptions": {
    // 你的自定义配置
  }
}
```

## 配置说明

- `base.json`: 基础配置，包含共享的编译器选项
- `tsconfig.dom.json`: 针对浏览器环境的配置
- `tsconfig.node.json`: 针对 Node.js 环境的配置