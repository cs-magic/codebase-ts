// presets/webpack.common.js - 基础配置
const path = require("path");
const { getLocalIdent } = require("../utils/getCssModuleLocalIdent");

module.exports = {
  entry: "./src/index",

  output: {
    path: path.resolve(process.cwd(), "dist"),
    publicPath: "/",
    clean: true,
  },

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      "@": path.resolve(process.cwd(), "src"),
    },
  },

  module: {
    rules: [
      // JavaScript/TypeScript
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },

      // Styles
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                getLocalIdent,
              },
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },

      // Assets
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10kb
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
};
