import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin",
          "/admin/",
          "/editor",
          "/editor/",
          // Internal component gallery — was fully crawlable and indexable.
          "/design-system",
          "/design-system/",
          // Transactional / personal routes: no SEO value, waste crawl budget.
          "/cart",
          "/checkout",
          "/profile",
          "/payment",
          "/payment-result",
          // Faceted listing URLs produce near-duplicate pages.
          "/*?*search=",
          "/*?*price_min=",
          "/*?*price_max=",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
