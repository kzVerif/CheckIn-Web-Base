import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    typescript: {
    ignoreBuildErrors: true, // 💀 ข้าม TypeScript error ทั้งหมดตอน build
  },
};

export default nextConfig;
