import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // Not needed for Vercel
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // No basePath/assetPrefix for Vercel deployment
  // basePath: process.env.NODE_ENV === 'production' ? '/resizable' : '',
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/resizable' : '',
  // Đảm bảo static files được handle đúng
  experimental: {
    optimizeCss: false,
  },
};

export default nextConfig;
