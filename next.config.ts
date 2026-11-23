import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Images are still served from the original SwissBake CDN hosts.
    // When your API/CDN changes, add the new host here.
    remotePatterns: [
      { protocol: "https", hostname: "b2b.swissbake.in" },
      { protocol: "https", hostname: "www.swissbake.in" },
    ],
  },
};

export default nextConfig;
