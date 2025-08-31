import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/timezone",
        destination: `${process.env.API_URL}/api/timezone`,
      },
      {
        source: "/api/timezone/:id",
        destination: `${process.env.API_URL}/api/timezone/:id`,
      },
    ];
  },
};

export default nextConfig;
