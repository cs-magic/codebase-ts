import react from '@vitejs/plugin-react'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { resolve } from 'path'
import wasm from 'vite-plugin-wasm'

const envDir = resolve('../..')

export default defineConfig({
  main: {
    envDir,
    plugins: [
      externalizeDepsPlugin({
        exclude: ['playwright-core'],
      }),
    ],
    resolve: {
      alias: {
        '@': resolve('resources'),
        // '.prisma/client/index-browser': '../../node_modules/.prisma/client/index-browser.js', // ref: https://github.com/prisma/prisma/issues/12504#issuecomment-1285883083
      },
    },
  },

  preload: {
    envDir,
    plugins: [externalizeDepsPlugin()],
  },

  renderer: {
    envDir,
    plugins: [
      react(),
      wasm(), // for tiktoken@llm
    ],
    // base: './',
    resolve: {
      alias: {
        '@': resolve('../../assets'),
        '@renderer': resolve('src/renderer/src'),
        '@assets': resolve('../../assets'),
        // '.prisma/client/index-browser': '../../node_modules/.prisma/client/index-browser.js', // ref: https://github.com/prisma/prisma/issues/12504#issuecomment-1285883083
      },
    },
  },
})
