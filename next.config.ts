import type { NextConfig } from "next";

import { securityHeaders } from "./src/config/security-headers";

/** Security headers, including the Content-Security-Policy (see src/config/security-headers.ts). */
const headers = securityHeaders({
  isDev: process.env.NODE_ENV === "development",
  vercelEnv: process.env.VERCEL_ENV,
});

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Required allowlist since Next.js 16; one quality keeps the image cache small.
    qualities: [75],
    // Licensed stock photos on the digital service pages (src/content/digital-services/photos.ts).
    remotePatterns: [{ protocol: "https", hostname: "images.pexels.com", pathname: "/photos/**" }],
  },
  async headers() {
    return [{ source: "/:path*", headers }];
  },
};

export default nextConfig;
