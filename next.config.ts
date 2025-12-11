import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  images: {
    unoptimized: true, // Wajib: karena extension gak bisa pakai Image Optimization server-side
  }
}

export default nextConfig;
