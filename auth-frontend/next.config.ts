import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    LOCAL_BACKEND_URL: process.env.LOCAL_BACKEND_URL,
  },
};

export default nextConfig;
