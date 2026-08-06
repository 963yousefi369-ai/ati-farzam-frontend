import type { Metadata } from "next";
import { getProducts, getCategories, djangoImageUrl } from "@/lib/api/django";
import ProductsClient from "./ProductsClient";
import { MOCK_CATEGORIES, MOCK_IMAGE_MAP } from "@/__mocks__/products";
import {
  SITE_NAME,
  breadcrumbJsonLd,
  canonical,
  cleanJsonLd,
  listingRobots,
} from "@/lib/seo";

export const revalidate = 120;

const PAGE_SIZE = 12;

type SearchParams = Promise<{
  page?: string;
  category?: string;
  search?: string;
}>;

interface ApiCategory {
  id: number | string;
  name: string;
}

interface ApiProduct {
  id: string | number;
  name: string;
  price: number;
  effective_price?: number;
  discount_price?: number;
  is_on_sale?: boolean;
  stock?: number;
  image?: string;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const sp = await searchParams;
  const search = sp.search ?? "";
  const category = sp.category ?? "";
  const page = Math.max(1, Number(sp.page ?? 1));

  let title = `\u0645\u062d\u0635\u0648\u0644\u0627\u062a | ${SITE_NAME}`;
  let description =
    "\u0631\u062f\u06cc\u0627\u0628 GPS \u062d\u0631\u0641\u0647\u200c\u0627\u06cc \u0628\u0631\u0627\u06cc \u062e\u0648\u062f\u0631\u0648\u060c \u0645\u0648\u062a\u0648\u0631\u0633\u06cc\u06a9\u0644\u062a \u0648 \u0646\u0627\u0648\u06af\u0627\u0646";

  if (search) {
    title = `\u062c\u0633\u062a\u062c\u0648: ${search} | \u0645\u062d\u0635\u0648\u0644\u0627\u062a`;
    description = `\u0646\u062a\u0627\u06cc\u062c \u062c\u0633\u062a\u062c\u0648\u06cc \u00ab${search}\u00bb \u062f\u0631 \u0645\u062d\u0635\u0648\u0644\u0627\u062a \u0631\u062f\u06cc\u0627\u0628 GPS`;
  } else if (category) {
    try {
      const categories: ApiCategory[] = await getCategories();
      const match = categories.find((c) => String(c.id) === category);
      if (match) {
        title = `${match.name} | ${SITE_NAME}`;
        description = `\u062e\u0631\u06cc\u062f ${match.name} \u0628\u0627 \u0636\u0645\u0627\u0646\u062a \u0627\u0635\u0627\u0644\u062a \u0648 \u067e\u0634\u062a\u06cc\u0628\u0627\u0646\u06cc \u06f2\u06f4 \u0633\u0627\u0639\u062a\u0647`;
      }
    } catch {
      // Metadata must never fail the page render.
    }
  }

  // Faceted and paginated URLs are near-duplicates. Keep them crawlable but
  // point the canonical at the clean /products URL.
  const isFiltered = Boolean(search) || Boolean(category) || page > 1;

  return {
    title,
    description,
    alternates: canonical("/products"),
    robots: listingRobots(isFiltered),
    openGraph: {
      title,
      description,
      url: "/products",
      locale: "fa_IR",
      type: "website",
    },
  };
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page ?? 1));
  const category = sp.category ?? "";
  const search = sp.search ?? "";

  const params: Record<string, string | number> = {
    page,
    page_size: PAGE_SIZE,
  };
  if (category) params.category_id = category;
  if (search) params.search = search;

  let products: ApiProduct[] = [];
  let totalCount = 0;
  let categories: ApiCategory[] = [];

  try {
    const [productsData, categoriesData] = await Promise.all([
      getProducts(params),
      getCategories(),
    ]);
    const rawList = (Array.isArray(productsData)
      ? productsData
      : (productsData.results ?? [])) as unknown as ApiProduct[];
    totalCount = productsData.count ?? rawList.length;
    products = rawList.map((p) => ({
      ...p,
      price: p.effective_price ?? p.discount_price ?? p.price,
      compare_price: p.is_on_sale ? p.price : undefined,
      in_stock: (p.stock ?? 0) > 0,
    }));
    categories = categoriesData ?? [];
  } catch (error) {
    console.error("Products fetch error:", error);
    categories = MOCK_CATEGORIES;
  }

  const imageMap: Record<string, string> =
    products.length > 0 ? {} : MOCK_IMAGE_MAP;
  for (const p of products) {
    if (p.image) imageMap[String(p.id)] = djangoImageUrl(p.image);
  }

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  const jsonLd = cleanJsonLd(
    breadcrumbJsonLd([
      { name: "\u062e\u0627\u0646\u0647", path: "/" },
      { name: "\u0645\u062d\u0635\u0648\u0644\u0627\u062a", path: "/products" },
    ]),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductsClient
        initialProducts={products}
        initialTotal={totalCount}
        initialTotalPages={totalPages}
        categories={categories}
        imageMap={imageMap}
        initialPage={page}
        initialCategory={category}
        initialSearch={search}
      />
    </>
  );
}
