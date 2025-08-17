import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images : {
    domains: ['carfitapp.s3.eu-north-1.amazonaws.com'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
}

export default nextConfig