const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

console.log("NODE_ENV: ", process.env.NODE_ENV);

module.exports = {
  entry: {
    // add entry paths
    // main: "./src/main.ts",
  },
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "[name].js",
    clean: true, // 这会在每次构建前清理输出目录。
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader", // exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: false, // Disable source map for CSS
            },
          },
          {
            loader: "postcss-loader",

            options: {
              postcssOptions: {
                // worked, most robust
                plugins: [require("tailwindcss"), require("autoprefixer")],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "url-loader",
        options: {
          limit: 8192, // inlines files smaller than 8kb
          name: "images/[name].[ext]",
          outputPath: "images/",
        },
      },
    ],
  },
  plugins: [
    //   CSS 最小化，这个插件用于最小化 CSS 文件。
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    // add copy-plugin if necessary
    // new CopyPlugin({
    //     patterns: ["assets/*", "manifest.json"],
    // }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        // 阻止 Terser 提取注释到单独的文件中，从而避免生成 main.js.LICENSE.txt 文件
        extractComments: false,
        terserOptions: {
          compress: {
            // 删除控制台日志:
            // 在 TerserPlugin 配置中添加了 compress: { drop_console: true }，这会在生产构建中移除 console.log 语句。
            drop_console: true,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],

    // 代码分割，这个配置将把来自 node_modules 的代码分离到一个单独的 vendors 块中。这有助于更好地利用浏览器缓存，因为第三方库的更新频率通常低于你的应用代码。
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },

    // 运行时代码分离，这会将 webpack 的运行时代码提取到单独的块中，有助于更好地利用长期缓存。
    runtimeChunk: "single",

    // 模块标识符，这确保了在没有新依赖项的情况下，构建之间的文件内容哈希保持一致。
    moduleIds: "deterministic",
  },
  devtool:
    process.env.NODE_ENV === "production" ? false : "cheap-module-source-map",
};
