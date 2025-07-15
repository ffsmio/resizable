import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Uncomment for GitHub Pages deployment
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // GitHub Pages deployment for organization repo
  basePath: process.env.NODE_ENV === 'production' ? '/resizable' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/resizable' : '',
  // Đảm bảo static files được handle đúng
  experimental: {
    optimizeCss: false,
  },
};

export default nextConfig;
