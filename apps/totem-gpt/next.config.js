const path = require('path');
const withFonts = require('next-fonts');

const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'pbxt.replicate.delivery',
      'g4yqcv8qdhf169fk.public.blob.vercel-storage.com',
    ],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = withFonts(nextConfig);
