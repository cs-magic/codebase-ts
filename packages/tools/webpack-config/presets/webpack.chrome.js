// presets/webpack.chrome.js
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { merge } = require("webpack-merge");

/**
 * @param {Object} env
 * @param {boolean} env.development 是否为开发环境
 * @returns {import('webpack').Configuration}
 */
module.exports = (env = {}) => {
  const isDev = env.development;

  return {
    entry: {
      // 扩展的不同入口点
      background: "./src/background/index.ts",
      contentScript: "./src/content/index.ts",
      popup: "./src/popup/index.tsx",
      options: "./src/options/index.tsx",
    },

    output: {
      path: path.resolve(process.cwd(), "dist"),
      filename: "[name].js",
      clean: true,
    },

    module: {
      rules: [
        // 处理 TypeScript
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },

        // 处理样式
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
        },
        {
          test: /\.s[ac]ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            "sass-loader",
          ],
        },

        // 处理资源文件
        {
          test: /\.(png|jpg|jpeg|gif)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/images/[name][ext]",
          },
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
      ],
    },

    plugins: [
      new CleanWebpackPlugin(),

      // 复制静态资源和 manifest
      new CopyPlugin({
        patterns: [
          {
            from: "./src/manifest.json",
            to: "manifest.json",
            transform(content) {
              // 替换 manifest 中的版本号等信息
              const manifest = JSON.parse(content);
              return JSON.stringify(
                {
                  ...manifest,
                  version: process.env.npm_package_version,
                },
                null,
                2,
              );
            },
          },
          {
            from: "./src/assets",
            to: "assets",
          },
        ],
      }),

      // 提取 CSS
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
    ],

    optimization: {
      // 代码分割配置
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
          common: {
            name: "common",
            minChunks: 2,
            chunks: "all",
            priority: -10,
          },
        },
      },
    },

    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      alias: {
        "@": path.resolve(process.cwd(), "src"),
        "@components": path.resolve(process.cwd(), "src/components"),
        "@assets": path.resolve(process.cwd(), "src/assets"),
        "@utils": path.resolve(process.cwd(), "src/utils"),
      },
    },
  };
};
