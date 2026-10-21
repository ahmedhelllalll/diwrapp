import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  transpilePackages: ['recharts', 'es-toolkit'],
  devIndicators: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85],
  },
  async redirects() {
    return [
      {
        source: '/:lang/login',
        destination: '/:lang/coming-soon',
        permanent: false,
      },
      {
        source: '/:lang/signin',
        destination: '/:lang/coming-soon',
        permanent: false,
      },
      {
        source: '/:lang/signup',
        destination: '/:lang/coming-soon',
        permanent: false,
      },
      {
        source: '/:lang/register',
        destination: '/:lang/coming-soon',
        permanent: false,
      },
      {
        source: '/:lang/reset-password',
        destination: '/:lang/coming-soon',
        permanent: false,
      },
      {
        source: '/login',
        destination: '/en/coming-soon',
        permanent: false,
      },
      {
        source: '/signin',
        destination: '/en/coming-soon',
        permanent: false,
      },
      {
        source: '/signup',
        destination: '/en/coming-soon',
        permanent: false,
      },
      {
        source: '/register',
        destination: '/en/coming-soon',
        permanent: false,
      },
      {
        source: '/reset-password',
        destination: '/en/coming-soon',
        permanent: false,
      },
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