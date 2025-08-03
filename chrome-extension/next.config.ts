import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
  images: { unoptimized: true },
  assetPrefix: "./",
  webpack: (config, { isServer, dev }) => {
    if (!isServer && !dev) {
      config.entry.background = "./src/background.ts";
    }
    return config;
  },
};

export default nextConfig;
