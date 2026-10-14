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
    // Licensed stock photos (src/content/event-photos.ts).
    remotePatterns: [{ protocol: "https", hostname: "images.pexels.com", pathname: "/photos/**" }],
  },
  // The digital agency is now a separate business and website: its old pages here redirect
  // permanently to the homepage, so existing links and search results never hit a 404.
  async redirects() {
    return [
      { source: "/digital-solutions", destination: "/", permanent: true },
      { source: "/digital-solutions/:path*", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers }];
  },
};

export default nextConfig;
