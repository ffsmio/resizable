import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Needed for Netlify static hosting
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // No basePath/assetPrefix for Netlify deployment
  // basePath: process.env.NODE_ENV === 'production' ? '/resizable' : '',
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/resizable' : '',
  // Đảm bảo static files được handle đúng
  experimental: {
    optimizeCss: false,
  },
};

export default nextConfig;
