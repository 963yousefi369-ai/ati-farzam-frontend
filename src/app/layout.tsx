import type { Metadata, Viewport } from 'next'
import { Vazirmatn } from 'next/font/google'
import '@/styles/globals.css'
import Providers from '@/components/Providers'

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-vazirmatn',
  weight: ['400', '500', '600', '700'],
})

// Always use the canonical domain — ignore NEXT_PUBLIC_SITE_URL which may
// point to an internal hosting URL or wrong domain during deployment.
const SITE_URL = 'https://farzamgps.ir'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'آتی فرزام ایرانیان — ردیاب GPS خودرو و ناوگان',
    template: '%s | آتی فرزام ایرانیان',
  },
  description: 'خرید و نصب ردیاب GPS خودرو، موتورسیکلت و ناوگان با گارانتی معتبر و پشتیبانی ۲۴ ساعته. ردیابی لحظه‌ای، مدیریت ناوگان و امنیت خودرو.',
  keywords: ['ردیاب GPS', 'ردیاب خودرو', 'مدیریت ناوگان', 'ردیاب موتورسیکلت', 'ردیاب شخصی', 'GPS tracker', 'آتی فرزام'],
  authors: [{ name: 'آتی فرزام ایرانیان', url: SITE_URL }],
  creator: 'آتی فرزام ایرانیان',
  publisher: 'آتی فرزام ایرانیان',
  icons: {
    icon: '/icon',
    apple: '/icon',
  },
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    url: SITE_URL,
    siteName: 'آتی فرزام ایرانیان',
    title: 'آتی فرزام ایرانیان — ردیاب GPS خودرو و ناوگان',
    description: 'خرید و نصب ردیاب GPS خودرو با گارانتی معتبر و پشتیبانی ۲۴ ساعته',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'آتی فرزام ایرانیان - ردیاب GPS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'آتی فرزام ایرانیان — ردیاب GPS خودرو و ناوگان',
    description: 'خرید و نصب ردیاب GPS خودرو با گارانتی معتبر',
    images: ['/og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {},
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0B1B2B',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'آتی فرزام ایرانیان',
              url: SITE_URL,
              logo: `${SITE_URL}/icon`,
              description: 'ارائه راهکارهای هوشمند ردیابی GPS و مدیریت ناوگان',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+98-21-12345678',
                contactType: 'customer service',
                availableLanguage: 'Persian',
              },
              sameAs: [],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'آتی فرزام ایرانیان',
              url: SITE_URL,
              potentialAction: {
                '@type': 'SearchAction',
                target: `${SITE_URL}/products?search={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
