import type { Metadata } from "next";
import { getProduct, getProducts, djangoImageUrl } from "@/lib/api/django";
import ProductDetailClient from "./ProductDetailClient";
import {
  MOCK_PRODUCT_DETAIL,
  MOCK_SIMILAR_PRODUCTS,
  MOCK_IMAGES,
} from "@/__mocks__/products";
import {
  SITE_NAME,
  absoluteUrl,
  breadcrumbJsonLd,
  canonical,
  cleanJsonLd,
  metaDescription,
} from "@/lib/seo";

export const revalidate = 86400;

interface ApiProduct {
  id?: string | number;
  slug?: string;
  name: string;
  description?: string;
  meta_description?: string;
  price: number;
  compare_price?: number;
  effective_price?: number;
  discount_price?: number;
  is_on_sale?: boolean;
  in_stock?: boolean;
  stock?: number;
  sku?: string;
  rating?: number;
  review_count?: number;
  category_id?: string | number;
  category_name?: string;
  image?: string;
  images?: Array<string | { image: string }>;
  updated_at?: string;
  _imageUrl?: string;
}

export async function generateStaticParams() {
  try {
    const data = await getProducts({ page_size: 100 });
    const products: ApiProduct[] = Array.isArray(data)
      ? data
      : (data.results ?? []);
    return products
      .filter((product) => Boolean(product.slug))
      .map((product) => ({ slug: String(product.slug) }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product: ApiProduct = await getProduct(slug);
    const description =
      metaDescription(product.meta_description) ||
      metaDescription(product.description) ||
      `\u062e\u0631\u06cc\u062f ${product.name} \u0628\u0627 \u0636\u0645\u0627\u0646\u062a \u0627\u0635\u0627\u0644\u062a\u060c \u0646\u0635\u0628 \u062a\u062e\u0635\u0635\u06cc \u0648 \u067e\u0634\u062a\u06cc\u0628\u0627\u0646\u06cc \u06f2\u06f4 \u0633\u0627\u0639\u062a\u0647`;
    const image = product.image ? djangoImageUrl(product.image) : undefined;

    return {
      title: product.name,
      description,
      // Each product must point at itself, not at the homepage.
      alternates: canonical(`/products/${slug}`),
      openGraph: {
        title: `${product.name} | ${SITE_NAME}`,
        description,
        url: `/products/${slug}`,
        locale: "fa_IR",
        type: "website",
        images: image ? [{ url: image, alt: product.name }] : undefined,
      },
    };
  } catch {
    return {
      title: "\u0645\u062d\u0635\u0648\u0644",
      alternates: canonical(`/products/${slug}`),
      robots: { index: false, follow: true },
    };
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let product: ApiProduct;
  try {
    product = await getProduct(slug);
  } catch {
    // Backend offline — render the mock so the route still resolves.
    return (
      <ProductDetailClient
        product={MOCK_PRODUCT_DETAIL}
        images={MOCK_IMAGES}
        similarProducts={MOCK_SIMILAR_PRODUCTS}
      />
    );
  }

  if (product.is_on_sale || product.effective_price || product.discount_price) {
    product.compare_price = product.is_on_sale
      ? product.price
      : (product.compare_price ?? undefined);
    product.price =
      product.effective_price ?? product.discount_price ?? product.price;
  }

  let images: string[] = [];
  if (product.image) images.push(djangoImageUrl(product.image));
  if (Array.isArray(product.images)) {
    const extra = product.images
      .map((img) => djangoImageUrl(typeof img === "string" ? img : img.image))
      .filter((url) => url && !images.includes(url));
    images = [...images, ...extra];
  }

  const isOutOfStock = product.in_stock === false || product.stock === 0;

  let similarProducts: ApiProduct[] = [];
  try {
    const similarParams: Record<string, string | number> = { page_size: 5 };
    if (product.category_id) similarParams.category_id = product.category_id;
    const similarData = await getProducts(similarParams);
    const similarList: ApiProduct[] = Array.isArray(similarData)
      ? similarData
      : (similarData.results ?? []);
    similarProducts = similarList
      .filter((p) => p.slug !== slug)
      .slice(0, 4)
      .map((p) => {
        const next: ApiProduct = { ...p };
        next._imageUrl = next.image ? djangoImageUrl(next.image) : "";
        if (next.is_on_sale || next.effective_price || next.discount_price) {
          next.compare_price = next.is_on_sale
            ? next.price
            : (next.compare_price ?? undefined);
          next.price =
            next.effective_price ?? next.discount_price ?? next.price;
        }
        return next;
      });
  } catch {
    similarProducts = MOCK_SIMILAR_PRODUCTS;
  }

  const productUrl = absoluteUrl(`/products/${slug}`);

  // Offer price must stay valid for Google Merchant; one year out is standard.
  const priceValidUntil = new Date(Date.now() + 31_536_000_000)
    .toISOString()
    .slice(0, 10);

  const productJsonLd = cleanJsonLd({
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl}#product`,
    name: product.name,
    description: metaDescription(product.description, 500),
    image: images.length > 0 ? images : undefined,
    sku: product.sku ?? undefined,
    mpn: product.sku ?? undefined,
    category: product.category_name ?? undefined,
    brand: { "@type": "Brand", name: SITE_NAME },
    offers: {
      "@type": "Offer",
      url: productUrl,
      price: product.price,
      priceCurrency: "IRR",
      priceValidUntil,
      itemCondition: "https://schema.org/NewCondition",
      availability: isOutOfStock
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/InStock",
      seller: { "@type": "Organization", name: SITE_NAME },
    },
    aggregateRating:
      product.review_count && product.review_count > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: product.rating ?? 4.5,
            reviewCount: product.review_count,
          }
        : undefined,
  });

  const breadcrumbs = cleanJsonLd(
    breadcrumbJsonLd([
      { name: "\u062e\u0627\u0646\u0647", path: "/" },
      { name: "\u0645\u062d\u0635\u0648\u0644\u0627\u062a", path: "/products" },
      { name: product.name, path: `/products/${slug}` },
    ]),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([productJsonLd, breadcrumbs]),
        }}
      />
      <ProductDetailClient
        product={product}
        images={images}
        similarProducts={similarProducts}
      />
    </>
  );
}
