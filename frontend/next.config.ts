import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx"],
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
