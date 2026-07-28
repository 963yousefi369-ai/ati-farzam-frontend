import type { MetadataRoute } from "next";
import { getProducts, getDjangoBlogs } from "@/lib/api/django";
import { SITE_URL } from "@/lib/seo";

// Regenerate the sitemap daily instead of freezing it at build time.
export const revalidate = 86400;

const PAGE_SIZE = 100;
const MAX_PAGES = 20; // hard stop: 2000 products

interface SitemapProduct {
  slug?: string;
  updated_at?: string;
  created_at?: string;
}

interface SitemapPost {
  slug?: string;
  updated_at?: string;
  published_at?: string;
  created_at?: string;
}

function toDate(...candidates: Array<string | undefined>): Date {
  for (const candidate of candidates) {
    if (!candidate) continue;
    const parsed = new Date(candidate);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  return new Date();
}

/**
 * The previous version fetched a single page of 100 products, so anything
 * beyond the first 100 was never submitted to Google.
 */
async function fetchAllProducts(): Promise<SitemapProduct[]> {
  const all: SitemapProduct[] = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    const data = await getProducts({ page, page_size: PAGE_SIZE });
    const list: SitemapProduct[] = Array.isArray(data)
      ? data
      : (data.results ?? []);
    all.push(...list);
    if (Array.isArray(data) || list.length < PAGE_SIZE) break;
  }
  return all;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "daily", priority: 1.0 },
    {
      url: `${SITE_URL}/products`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    { url: `${SITE_URL}/software`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.6 },
  ];

  let productPages: MetadataRoute.Sitemap = [];
  try {
    const products = await fetchAllProducts();
    productPages = products
      .filter((product) => Boolean(product.slug))
      .map((product) => ({
        url: `${SITE_URL}/products/${product.slug}`,
        lastModified: toDate(product.updated_at, product.created_at),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
  } catch (error) {
    console.error("sitemap: product fetch failed", error);
  }

  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const posts: SitemapPost[] = await getDjangoBlogs();
    blogPages = (posts ?? [])
      .filter((post) => Boolean(post.slug))
      .map((post) => ({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: toDate(
          post.updated_at,
          post.published_at,
          post.created_at,
        ),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
  } catch (error) {
    console.error("sitemap: blog fetch failed", error);
  }

  // De-duplicate defensively — a slug collision would emit a duplicate <url>.
  const seen = new Set<string>();
  return [...staticPages, ...productPages, ...blogPages].filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
