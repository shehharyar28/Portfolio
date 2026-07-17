import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.44.67"],
  turbopack: {
    root: path.join(__dirname),
  },
  // allowedDevOrigins: ["http://localhost:3000"],
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1280],
    imageSizes: [96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    qualities: [50, 65, 70, 75],
  },
  // Compress static assets served by Next
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
