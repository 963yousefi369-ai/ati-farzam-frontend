import type { MetadataRoute } from 'next'

// Always use the canonical domain — ignore NEXT_PUBLIC_SITE_URL which may
// point to an internal hosting URL (e.g. runflare.run) during deployment.
const BASE_URL = 'https://farzamgps.ir'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/editor', '/api', '/cart', '/checkout', '/profile'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
