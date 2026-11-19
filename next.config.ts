import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true,
  },
  images: {
    qualities: [75, 90],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [384, 640, 900],
    imageSizes: [32, 48, 64, 96, 128, 256],
  },
};

export default nextConfig;
