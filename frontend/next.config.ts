import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  
  /* config options here */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard/cards",
        permanent: true,
      },
    ];
  }
};

export default nextConfig;
