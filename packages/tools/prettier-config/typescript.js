// typescript.js - TypeScript 专用配置
module.exports = {
    ...require('./index'),

    // 使用 organize-imports 插件
    plugins: ['prettier-plugin-organize-imports'],

    // TypeScript 特定配置
    importOrder: [
        '^(react/(.*)$)|^(react$)',
        '^(next/(.*)$)|^(next$)',
        '<THIRD_PARTY_MODULES>',
        '',
        '^types/(.*)$',
        '^@/types/(.*)$',
        '^@/config/(.*)$',
        '^@/lib/(.*)$',
        '^@/hooks/(.*)$',
        '^@/components/ui/(.*)$',
        '^@/components/(.*)$',
        '^@/styles/(.*)$',
        '^@/app/(.*)$',
        '',
        '^[./]',
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
}