import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "api.dicebear.com"
      },
      {
        hostname: "lh3.googleusercontent.com",
        pathname: "**"
      }
    ]
  }
};

export default nextConfig;
