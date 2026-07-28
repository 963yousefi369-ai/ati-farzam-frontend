/**
 * Central SEO helpers.
 *
 * The canonical URL is the single most important signal here. Previously the
 * root layout declared `alternates.canonical = SITE_URL`, which every page
 * inherited — so Google was told that /products, /software, /blog/... are all
 * duplicates of the homepage. Pages must declare their own canonical.
 */

export const SITE_URL = "https://farzamgps.ir";
export const SITE_NAME =
  "\u0622\u062a\u06cc \u0641\u0631\u0632\u0627\u0645 \u0627\u06cc\u0631\u0627\u0646\u06cc\u0627\u0646";

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = "/"): string {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** `alternates.canonical` block for a page. */
export function canonical(path = "/") {
  return { canonical: absoluteUrl(path) };
}

/**
 * Robots directives for filtered / paginated listing URLs.
 * Faceted URLs (?search=, ?price_min=, page 2+) create near-duplicate pages
 * that eat crawl budget. Keep them crawlable but out of the index.
 */
export function listingRobots(isFiltered: boolean) {
  return isFiltered
    ? { index: false, follow: true }
    : { index: true, follow: true };
}

/** Trim and collapse text into a clean meta description. */
export function metaDescription(input: string | undefined, max = 155): string {
  if (!input) return "";
  const clean = input
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trimEnd()}\u2026`;
}

type Crumb = { name: string; path: string };

/** BreadcrumbList JSON-LD — drives the breadcrumb display in Google results. */
export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/** Strip undefined values so JSON-LD never emits `"key": undefined`. */
export function cleanJsonLd<T extends Record<string, unknown>>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}
