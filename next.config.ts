import type { NextConfig } from "next";

const API_URL =
  process.env.INTERNAL_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  generateEtags: true,

  // Strip console noise from the production bundle (keep errors/warnings).
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  experimental: {
    /**
     * Barrel-file optimization. `lucide-react` alone re-exports ~1500 icons;
     * without this every import pulls the whole barrel into the client graph.
     * This is the single biggest JS bundle win in the project.
     */
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "date-fns",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-select",
      "@radix-ui/react-tabs",
      "@radix-ui/react-toast",
      "@radix-ui/react-alert-dialog",
      "@radix-ui/react-avatar",
    ],
  },

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Optimized images were re-encoded on every cache miss; hold them for 30 days.
    minimumCacheTTL: 2_592_000,
    dangerouslyAllowSVG: false,
    contentDispositionType: "attachment",
    remotePatterns: [
      { protocol: "https", hostname: "farzamgps.ir" },
      { protocol: "https", hostname: "*.runflare.run" },
      { protocol: "http", hostname: "localhost", port: "8000" },
      { protocol: "http", hostname: "127.0.0.1", port: "8000" },
      { protocol: "http", hostname: "backend", port: "8000" },
      { protocol: "http", hostname: "0.0.0.0" },
      { protocol: "http", hostname: "95.38.161.104" },
      { protocol: "http", hostname: "95.38.161.205" },
    ],
  },

  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/image/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/media/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        // Never let a search engine or CDN cache a personal/transactional page.
        source: "/:path(cart|checkout|profile|payment|payment-result)",
        headers: [
          { key: "Cache-Control", value: "private, no-store" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/:path(admin|editor|design-system)/:rest*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      { source: "/api/:path*", destination: `${API_URL}/api/:path*` },
      { source: "/media/:path*", destination: `${API_URL}/media/:path*` },
    ];
  },

  async redirects() {
    return process.env.NODE_ENV === "production"
      ? [
          { source: "/editor", destination: "/404", permanent: false },
          { source: "/editor/:path*", destination: "/404", permanent: false },
          {
            source: "/design-system",
            destination: "/404",
            permanent: false,
          },
        ]
      : [];
  },
};

export default nextConfig;
