import { resolve } from 'node:path';

const config = {
  plugins: {
    '@tailwindcss/postcss': { base: resolve('src') },
  },
};

export default config;
