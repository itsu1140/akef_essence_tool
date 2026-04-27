import type { NextConfig } from "next";

const isCloudflare = process.env.NEXT_BUILD_TARGET === "cloudflare";
const rootPath = process.env.ROOT_PATH || "";

const nextConfig: NextConfig = {
  output: isCloudflare ? undefined : "standalone",
  basePath: rootPath,
  assetPrefix: rootPath,
};

export default nextConfig;
