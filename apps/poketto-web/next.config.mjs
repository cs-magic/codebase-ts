/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validations. This is especially useful
 * for Docker builds.
 */
import path from "path";
import dotenv from "dotenv";
import bundleAnalyzer from "@next/bundle-analyzer";
import { fileURLToPath } from "node:url";

dotenv.config({
  path: path.join(fileURLToPath(import.meta.url), "../../.env"),
});
dotenv.config({
  path: path.join(fileURLToPath(import.meta.url), "../../.env.local"),
});

await import("./src/env.mjs");

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    // typedRoutes: true // too strict, since we have a dozen of json uri
    // serverActions: true // it's default supported in NextJS 14
  },

  distDir: process.env.DIST ?? ".next",

  reactStrictMode: true,

  /**
   * 1. If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
   * out. @see https://github.com/vercel/next.js/issues/41980
   * 2. i18n mjs 支持，@see https://github.com/t3-oss/create-t3-app/issues/332#issuecomment-1243022020, https://github.com/jmarianski/t3-i18n
   */
  i18n: {
    defaultLocale: "zh-CN",
    locales: ["zh-CN", "en"],
  },

  // ref: https://nextjs.org/docs/api-reference/next/image#remote-patterns
  images: {
    remotePatterns: [
      // ref:https://stackoverflow.com/a/73951135/9422455
      { protocol: "http", hostname: "**" },
      { protocol: "https", hostname: "**" },
    ],
  }, // 这个可以，ref: https://frontend-digest.com/how-to-import-svgs-into-nextjs-8ec6100e613f
  webpack(config) {
    // 添加对 TypeScript 文件的处理 （主要是外部的ts，参考：https://chatgpt.com/c/138dbb55-e68d-43f6-8668-def2d403a138）
    config.module.rules.push({
      test: /\.tsx?$/,
      use: [
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true, // 只进行编译而不执行类型检查
          },
        },
      ],
      exclude: /node_modules/,
    });

    // ref: https://chatgpt.com/c/d53f2bd8-7372-4c55-8e4f-d9d91e56876c
    config.module.rules.push({
      // todo: 为什么不能加图片类型（png|jpg|jpeg|ico）？提示：is not a valid image file. The image may be corrupted or an unsupported format.
      test: /\.(html|yml)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            publicPath: "/_next/static/assets/", // Public path for the asset
            outputPath: "static/assets/", // Output directory
          },
        },
      ],
      exclude: /node_modules/,
    });

    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default withBundleAnalyzer(config);
