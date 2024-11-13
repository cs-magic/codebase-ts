// presets/webpack.nextjs.js
const path = require("path");
const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules");

/**
 * @param {import('next').NextConfig} nextConfig
 * @returns {import('next').NextConfig}
 */
const withCustomWebpack = (nextConfig = {}) => {
  return withPlugins(
    [
      // Add modules that need transpilation
      withTM([
        // Add any npm packages that need transpilation
      ]),
    ],
    {
      ...nextConfig,
      webpack: (config, options) => {
        const { buildId, dev, isServer, defaultLoaders, webpack } = options;

        // Allow importing from outside of src directory
        config.resolve.modules.push(process.cwd());

        // Important: return the modified config
        return {
          ...config,

          // Modify module rules
          module: {
            ...config.module,
            rules: [
              ...config.module.rules,

              // Add custom rules here
              {
                test: /\.svg$/,
                use: ["@svgr/webpack"],
              },
            ],
          },

          // Modify resolve
          resolve: {
            ...config.resolve,
            alias: {
              ...config.resolve.alias,
              "@": path.join(process.cwd(), "src"),
              "@components": path.join(process.cwd(), "src/components"),
              "@lib": path.join(process.cwd(), "src/lib"),
              "@styles": path.join(process.cwd(), "src/styles"),
            },
          },

          // Modify plugins
          plugins: [
            ...config.plugins,

            // Add custom plugins here
            new webpack.DefinePlugin({
              __DEV__: dev,
            }),
          ],

          // Production optimizations
          optimization: {
            ...config.optimization,
            minimize: !dev,
            minimizer: dev ? [] : config.optimization.minimizer,

            // Customize splitChunks
            splitChunks: {
              ...config.optimization.splitChunks,
              chunks: "all",
              minSize: 20000,
              maxSize: 244000,
              cacheGroups: {
                ...config.optimization.splitChunks.cacheGroups,
                vendors: {
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  reuseExistingChunk: true,
                },
                common: {
                  minChunks: 2,
                  priority: -10,
                  reuseExistingChunk: true,
                },
                styles: {
                  name: "styles",
                  test: /\.(css|scss)$/,
                  chunks: "all",
                  enforce: true,
                },
              },
            },
          },
        };

        // For webpack 5 support
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false,
          net: false,
          tls: false,
        };

        // Allow importing worker files
        config.module.rules.push({
          test: /\.worker\.(js|ts)$/,
          loader: "worker-loader",
          options: {
            filename: "static/[hash].worker.js",
            publicPath: "/_next/",
          },
        });

        if (typeof nextConfig.webpack === "function") {
          return nextConfig.webpack(config, options);
        }

        return config;
      },
    },
  );
};

module.exports = withCustomWebpack;
