import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['recharts', 'es-toolkit'],
  devIndicators: false,
};

export default nextConfig;