import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Figma frames are 1440 wide; 2x covers retina without overshooting.
    deviceSizes: [360, 390, 640, 768, 1024, 1280, 1440, 1920, 2880],
    imageSizes: [64, 128, 256, 384, 512],
  },
  async headers() {
    return [
      {
        source: "/models/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
