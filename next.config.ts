import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['rickandmortyapi.com'],
  },
};

export default nextConfig;
