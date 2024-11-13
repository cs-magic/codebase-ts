// presets/webpack.development.js - 开发环境配置
const webpack = require("webpack");

module.exports = {
  mode: "development",

  devtool: "eval-source-map",

  devServer: {
    hot: true,
    historyApiFallback: true,
    port: 3000,
    client: {
      overlay: true,
    },
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],
};
