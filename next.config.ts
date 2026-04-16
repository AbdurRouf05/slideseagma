import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/docs',
        destination: '/docs.html',
      },
      {
        source: '/admin',
        destination: '/admin.html',
      },
    ];
  },
};

export default nextConfig;
