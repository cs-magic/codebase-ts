// presets/webpack.react.js - React 配置
module.exports = {
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-react",
              ["@babel/preset-env", { modules: false }],
            ],
            plugins: ["react-hot-loader/babel"],
          },
        },
      },
    ],
  },
};
