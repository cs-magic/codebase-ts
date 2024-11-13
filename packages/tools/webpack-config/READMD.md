# @cs-magic/webpack-config

CS Magic 项目的共享 Webpack 配置。

## 安装

```bash
npm install --save-dev @cs-magic/webpack-config
```

## 使用

### 基础配置

```js
// webpack.config.js
const getWebpackConfig = require('@cs-magic/webpack-config')

module.exports = getWebpackConfig({
  development: process.env.NODE_ENV === 'development',
  production: process.env.NODE_ENV === 'production',
})
```

### React + TypeScript 项目

```js
// webpack.config.js
const getWebpackConfig = require('@cs-magic/webpack-config')

module.exports = getWebpackConfig({
  development: process.env.NODE_ENV === 'development',
  production: process.env.NODE_ENV === 'production',
  react: true,
  typescript: true,
})
```

### 自定义配置

```js
// webpack.config.js
const { merge } = require('webpack-merge')
const getWebpackConfig = require('@cs-magic/webpack-config')

const customConfig = {
  // 你的自定义配置
}

module.exports = env => merge(getWebpackConfig(env), customConfig)
```

## 特性

- 开发环境优化
    - 热模块替换
    - Source Maps
    - 开发服务器配置

- 生产环境优化
    - 代码分割
    - 压缩和混淆
    - CSS 提取和优化
    - Bundle 分析

- 资源处理
    - JavaScript/TypeScript
    - CSS/SASS
    - 图片和字体
    - CSS Modules

- React 支持
    - 热重载
    - JSX/TSX 支持

- TypeScript 支持
    - 类型检查
    - 编译优化

## 命令

```json
{
  "scripts": {
    "start": "webpack serve --env development",
    "build": "webpack --env production",
    "analyze": "ANALYZE=true webpack --env production"
  }
}
```

## 环境变量

- `NODE_ENV`: 决定构建模式
- `ANALYZE`: 开启 bundle 分析

## 扩展配置

### 添加新的 loader

```js
const config = getWebpackConfig({ development: true })

config.module.rules.push({
  test: /\.mdx?$/,
  use: ['babel-loader', '@mdx-js/loader'],
})
```

### 添加新的插件

```js
const config = getWebpackConfig({ production: true })
const CompressionPlugin = require('compression-webpack-plugin')

config.plugins.push(new CompressionPlugin())
```

## Next.js Integration

For Next.js projects, we provide a webpack config modifier that works with Next.js's webpack configuration:

```js
// next.config.js
const { withCustomWebpack } = require('@cs-magic/webpack-config/presets/webpack.nextjs')

const nextConfig = {
  reactStrictMode: true,
  // Your other Next.js config
}

module.exports = withCustomWebpack(nextConfig)
```

### Features

- Custom aliases (@, @components, etc.)
- SVG support via @svgr/webpack
- Optimized chunk splitting
- Worker loader support
- Development environment variable
- Module transpilation support
- Production optimizations

### Environment Variables

The config automatically adds:
- `__DEV__`: boolean indicating development mode

### Custom Webpack Configuration

You can still add your own webpack configuration:

```js
const nextConfig = {
  webpack: (config, options) => {
    // Your custom webpack modifications
    return config
  }
}

module.exports = withCustomWebpack(nextConfig)
```

## Chrome Extension Configuration

为 Chrome 扩展项目提供特定的 webpack 配置：

```js
// webpack.config.js
const getWebpackConfig = require('@cs-magic/webpack-config/presets/webpack.chrome')

module.exports = (env) => {
  return getWebpackConfig({
    development: process.env.NODE_ENV === 'development'
  })
}
```

### 项目结构

推荐的项目结构：

```
src/
├── manifest.json
├── background/
│   └── index.ts
├── content/
│   └── index.ts
├── popup/
│   ├── index.tsx
│   └── popup.html
├── options/
│   ├── index.tsx
│   └── options.html
├── components/
│   └── shared/
├── assets/
│   └── icons/
└── utils/
```

### 特性

- Manifest V3 支持
- TypeScript 支持
- React 支持
- 样式处理 (CSS/SCSS)
- 资源处理
- 代码分割
- 热重载
- 开发环境优化

### 构建命令

在 `package.json` 中添加：

```json
{
  "scripts": {
    "dev": "webpack --watch --mode development --env development",
    "build": "webpack --mode production --env production",
    "clean": "rimraf dist"
  }
}
```

### 开发流程

1. 构建扩展：
```bash
npm run dev
```

2. 在 Chrome 中加载扩展：
  - 打开 `chrome://extensions/`
  - 启用"开发者模式"
  - 点击"加载已解压的扩展程序"
  - 选择 `dist` 目录

### 发布准备

构建生产版本：
```bash
npm run build
```

生成的 `dist` 目录包含可以上传到 Chrome Web Store 的内容。