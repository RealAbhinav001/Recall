import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Internal workspace packages ship TypeScript source, so Next compiles them.
  transpilePackages: ["@recall/shared"],
};

export default nextConfig;
