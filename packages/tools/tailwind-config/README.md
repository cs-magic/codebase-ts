# @cs-magic/tailwindcss-config

CS Magic 项目的共享 TailwindCSS 配置。

## 安装

```bash
npm install --save-dev @cs-magic/tailwindcss-config
# 或
yarn add -D @cs-magic/tailwindcss-config
```

## 使用

在你的 `tailwind.config.js` 中：

```js
module.exports = {
  // 使用预设配置
  presets: [require('@cs-magic/tailwindcss-config')],
  
  // 添加你自己的配置来覆盖预设
  theme: {
    extend: {
      // 你的自定义主题配置
    }
  },
  
  // 添加额外的插件
  plugins: [
    // 你的额外插件
  ]
}
```

## 特性

- 预配置的颜色主题和暗色模式支持
- 常用的间距和边框半径扩展
- 集成常用的 TailwindCSS 插件
- 自定义动画效果
- 针对 Next.js 和 React 项目优化的内容配置

## 包含的插件

- @tailwindcss/forms
- @tailwindcss/typography
- @tailwindcss/aspect-ratio
- @tailwindcss/container-queries
- tailwindcss-animate

## 自定义主题

配置包括明暗两种主题模式：

```js
// 使用浅色主题颜色
bg-background-primary
text-text-primary
border-border-light

// 使用深色主题颜色
dark:bg-dark-background-primary
dark:text-dark-text-primary
dark:border-dark-border-light
```

## 动画

包含预设的动画类：

```html
<div class="animate-fade-in">淡入效果</div>
<div class="animate-slide-in">滑入效果</div>
```