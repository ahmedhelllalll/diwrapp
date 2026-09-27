import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  transpilePackages: ['recharts', 'es-toolkit'],
  devIndicators: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/:lang/ai',
        destination: '/:lang/ask-di',
        permanent: true,
      },
      {
        source: '/:lang/book',
        destination: '/:lang/advertise',
        permanent: false,
      },
      {
        source: '/book',
        destination: '/en/advertise',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;