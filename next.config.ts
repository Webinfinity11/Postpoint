import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // ადმინიდან სურათის ატვირთვა (მაქს. 10 MB, src/app/admin/constants.ts) + ფორმის დანარჩენი ველები
    serverActions: { bodySizeLimit: "11mb" },
  },
};

export default nextConfig;
