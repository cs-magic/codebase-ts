const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const nodeExternals = [
  "playwright-core",

  // wechaty-grpc relative
  "wechaty-grpc",
  "@grpc/grpc-js",
  "@js-sdsl/ordered-map",
  "google-protobuf",
  "stronger-typed-streams",
  "level",
  "level-packager",
  "levelup",
  "deferred-leveldown",
  "abstract-leveldown",
  "level-supports",
  "is-buffer",
  "catering",
  "inherits",
  "level-iterator-stream",
  "readable-stream",
  "util-deprecate",
  "level-errors",
  "encoding-down",
  "level-codec",
  "leveldown",

  ".prisma",
  "@prisma/client",

  // "node-gyp-build",
];

module.exports = {
  target: "node", // ref: https://chatgpt.com/c/0bb5bb00-68a9-4c82-b396-0d1f4224215d

  entry: "./dist/api/main.ts",

  output: {
    filename: "bundle.js",
    path: path.resolve("/tmp", "dist"),
  },

  // 需要保留这些，否则依赖库（例如 wechaty-grpc（这个不建议用CopyPlugin，因为还有依赖））里用了这些会使它们在新的输出位置运行
  node: {
    __dirname: true,
    // __filename: true, // 本项目可不需要
    // global: true, // 本项目可不需要
  },

  externals: nodeExternals.reduce(
    (prev, key) => ({ ...prev, [key]: `commonjs ${key}` }),
    {},
  ),

  plugins: [
    new CopyPlugin({
      patterns: [
        ...nodeExternals.map((k) => ({
          from: `../../node_modules/${k}`,
          to: `node_modules/${k}`,
        })),
        {
          from: "../../.env.local",
          to: ".",
        },
      ],
    }),
  ],
};
