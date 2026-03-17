import type { NextConfig } from "next";

const isCloudflare = process.env.NEXT_BUILD_TARGET === "cloudflare";

const nextConfig: NextConfig = {
  // Docker/VPS 向け standalone ビルド。Cloudflare Pages ビルド時は無効化
  output: isCloudflare ? undefined : "standalone",
};

export default nextConfig;
