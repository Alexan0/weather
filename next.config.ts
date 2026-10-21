import type { NextConfig } from 'next';

import { BASE_PATH } from './src/config/base-path';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH ? `${BASE_PATH}/` : undefined,
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css'
      }
    }
  }
};

export default nextConfig;
