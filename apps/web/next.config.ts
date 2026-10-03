import path from "node:path";
import { loadEnvConfig } from "@next/env";
import { withSentryConfig } from "@sentry/nextjs/config";
import type { NextConfig } from "next";

// The monorepo keeps one .env at the repo root; Next only looks in its own
// folder by default, so load the root file explicitly. forceReload is required:
// Next has already loaded (and cached) env for apps/web before reading this file.
loadEnvConfig(
  path.resolve(process.cwd(), "../.."),
  process.env.NODE_ENV !== "production",
  undefined,
  true,
);

const nextConfig: NextConfig = {
  // Internal workspace packages ship TypeScript source, so Next compiles them.
  transpilePackages: ["@recall/shared", "@recall/db"],
};

export default withSentryConfig(nextConfig, {
  silent: !process.env.CI,
  telemetry: false,
});
