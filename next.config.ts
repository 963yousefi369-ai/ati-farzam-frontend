import type { NextConfig } from 'next'
import path from 'path'

const API_URL = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: path.join(__dirname),
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      { protocol: 'https', hostname: 'farzamgps.ir' },
      { protocol: 'https', hostname: '*.runflare.run' },
      { protocol: 'http', hostname: 'localhost', port: '8000' },
      { protocol: 'http', hostname: '127.0.0.1', port: '8000' },
      { protocol: 'http', hostname: 'backend', port: '8000' },
      { protocol: 'http', hostname: '0.0.0.0' },
      { protocol: 'http', hostname: '95.38.161.104' },
      { protocol: 'http', hostname: '95.38.161.205' },
    ],
  },
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/media/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${API_URL}/api/:path*`,
      },
      {
        source: '/media/:path*',
        destination: `${API_URL}/media/:path*`,
      },
    ]
  },
  async redirects() {
    return process.env.NODE_ENV === 'production'
      ? [
          {
            source: '/editor',
            destination: '/404',
            permanent: false,
          },
        ]
      : [];
  },
}
export default nextConfig
