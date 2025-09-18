import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://10.11.90.180:8080/api/:path*",
      },
    ];
  },
};

export default nextConfig;
