import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === "production" ? "./" : "",
  distDir: "dist",
  generateBuildId: () => "build",
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.output.publicPath = "./";
    }
    return config;
  },
};

export default nextConfig;
