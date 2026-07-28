import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";
import "@/styles/globals.css";
import Providers from "@/components/Providers";
import { SITE_NAME, SITE_URL, absoluteUrl, cleanJsonLd } from "@/lib/seo";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-vazirmatn",
  // 500 was never used in the design system; dropping it removes a full
  // font file from the critical path.
  weight: ["400", "600", "700"],
  preload: true,
  fallback: ["system-ui", "Segoe UI", "Tahoma", "sans-serif"],
  adjustFontFallback: true,
});

/**
 * Public contact details used in Organization structured data.
 * These must be real — Google cross-checks them against the site content.
 */
const ORG_PHONE = "+989151091882";
const ORG_EMAIL = "info@farzamgps.ir";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} \u2014 \u0631\u062f\u06cc\u0627\u0628 GPS \u062e\u0648\u062f\u0631\u0648 \u0648 \u0646\u0627\u0648\u06af\u0627\u0646`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "\u062e\u0631\u06cc\u062f \u0648 \u0646\u0635\u0628 \u0631\u062f\u06cc\u0627\u0628 GPS \u062e\u0648\u062f\u0631\u0648\u060c \u0645\u0648\u062a\u0648\u0631\u0633\u06cc\u06a9\u0644\u062a \u0648 \u0646\u0627\u0648\u06af\u0627\u0646 \u0628\u0627 \u06af\u0627\u0631\u0627\u0646\u062a\u06cc \u0645\u0639\u062a\u0628\u0631 \u0648 \u067e\u0634\u062a\u06cc\u0628\u0627\u0646\u06cc \u06f2\u06f4 \u0633\u0627\u0639\u062a\u0647. \u0631\u062f\u06cc\u0627\u0628\u06cc \u0644\u062d\u0638\u0647\u200c\u0627\u06cc\u060c \u0645\u062f\u06cc\u0631\u06cc\u062a \u0646\u0627\u0648\u06af\u0627\u0646 \u0648 \u0627\u0645\u0646\u06cc\u062a \u062e\u0648\u062f\u0631\u0648.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { telephone: false, address: false, email: false },
  icons: { icon: "/icon", apple: "/icon" },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} \u2014 \u0631\u062f\u06cc\u0627\u0628 GPS \u062e\u0648\u062f\u0631\u0648 \u0648 \u0646\u0627\u0648\u06af\u0627\u0646`,
    description:
      "\u062e\u0631\u06cc\u062f \u0648 \u0646\u0635\u0628 \u0631\u062f\u06cc\u0627\u0628 GPS \u062e\u0648\u062f\u0631\u0648 \u0628\u0627 \u06af\u0627\u0631\u0627\u0646\u062a\u06cc \u0645\u0639\u062a\u0628\u0631 \u0648 \u067e\u0634\u062a\u06cc\u0628\u0627\u0646\u06cc \u06f2\u06f4 \u0633\u0627\u0639\u062a\u0647",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - \u0631\u062f\u06cc\u0627\u0628 GPS`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} \u2014 \u0631\u062f\u06cc\u0627\u0628 GPS \u062e\u0648\u062f\u0631\u0648 \u0648 \u0646\u0627\u0648\u06af\u0627\u0646`,
    description:
      "\u062e\u0631\u06cc\u062f \u0648 \u0646\u0635\u0628 \u0631\u062f\u06cc\u0627\u0628 GPS \u062e\u0648\u062f\u0631\u0648 \u0628\u0627 \u06af\u0627\u0631\u0627\u0646\u062a\u06cc \u0645\u0639\u062a\u0628\u0631",
    images: ["/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // NOTE: no `alternates.canonical` here on purpose.
  // A canonical declared in the root layout is inherited by every route, which
  // told Google that all pages were duplicates of the homepage. Each page now
  // declares its own canonical via `canonical()` from `@/lib/seo`.
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0B1B2B",
};

const organizationJsonLd = cleanJsonLd({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl("/icon"),
  image: absoluteUrl("/og-default.jpg"),
  description:
    "\u0627\u0631\u0627\u0626\u0647 \u0631\u0627\u0647\u06a9\u0627\u0631\u0647\u0627\u06cc \u0647\u0648\u0634\u0645\u0646\u062f \u0631\u062f\u06cc\u0627\u0628\u06cc GPS \u0648 \u0645\u062f\u06cc\u0631\u06cc\u062a \u0646\u0627\u0648\u06af\u0627\u0646",
  email: ORG_EMAIL,
  telephone: ORG_PHONE,
  address: {
    "@type": "PostalAddress",
    addressCountry: "IR",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: ORG_PHONE,
      contactType: "customer service",
      areaServed: "IR",
      availableLanguage: ["Persian", "fa"],
    },
  ],
});

const websiteJsonLd = cleanJsonLd({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "fa-IR",
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/products?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <head>
        {/* Warm up the image/media origin before the first product image is requested. */}
        <link rel="preconnect" href={SITE_URL} />
        <link rel="dns-prefetch" href={SITE_URL} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, websiteJsonLd]),
          }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
