import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Allow images from external domains if needed later
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ],
  },
};

export default nextConfig;
