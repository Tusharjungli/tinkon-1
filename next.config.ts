import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  trailingSlash: false, // <--- this forces URLs to have NO trailing slash
};

export default nextConfig;
