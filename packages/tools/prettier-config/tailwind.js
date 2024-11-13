// tailwind.js - Tailwind CSS 专用配置
module.exports = {
    ...require('./index'),

    // 使用 Tailwind CSS 插件
    plugins: ['prettier-plugin-tailwindcss'],

    // Tailwind 特定配置
    tailwindAttributes: ['className', 'tw', 'clsx'],
    tailwindFunctions: ['cx', 'clsx', 'cva', 'tw'],
}
