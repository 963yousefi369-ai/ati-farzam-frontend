"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";
import { landingData } from "@/data/landing";
import { ProductPlaceholder } from "@/components/svg";
import { useCartStore } from "@/lib/store/cart";
import { cn, formatPrice } from "@/lib/utils";

interface ApiProduct {
  id: number;
  name: string;
  slug: string;
  price: number | string;
  discount_price?: number | string | null;
  effective_price?: number | string;
  image?: string | null;
  stock?: number;
  rating?: number;
  review_count?: number;
}

interface FeaturedProductsProps {
  apiProducts?: ApiProduct[];
  loading?: boolean;
}

interface DisplayProduct {
  id: string;
  numericId: number;
  slug?: string;
  name: string;
  price: number;
  imageUrl?: string;
  rating: number;
  reviewsCount: number;
  badge?: string | null;
  featured: boolean;
}

function ProductCardSkeleton() {
  return (
    <div className="flex min-h-[430px] flex-col overflow-hidden rounded-2xl border border-border-soft bg-white">
      <div className="aspect-[4/3] animate-shimmer" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="h-3 w-20 rounded-full animate-shimmer" />
        <div className="h-4 w-full rounded-full animate-shimmer" />
        <div className="h-4 w-2/3 rounded-full animate-shimmer" />
        <div className="mt-auto h-6 w-28 rounded-full animate-shimmer" />
        <div className="h-11 w-full rounded-xl animate-shimmer" />
      </div>
    </div>
  );
}

export default function FeaturedProducts({
  apiProducts,
  loading,
}: FeaturedProductsProps = {}) {
  const addItem = useCartStore((state) => state.addItem);

  if (loading) {
    return (
      <div
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        aria-label="در حال بارگذاری محصولات"
      >
        {[0, 1, 2, 3].map((item) => (
          <ProductCardSkeleton key={item} />
        ))}
      </div>
    );
  }

  const products: DisplayProduct[] = apiProducts?.length
    ? apiProducts.map((product) => ({
        id: String(product.id),
        numericId: product.id,
        slug: product.slug,
        name: product.name,
        price: Number(
          product.effective_price ?? product.discount_price ?? product.price,
        ),
        imageUrl: product.image || undefined,
        rating: product.rating || 0,
        reviewsCount: product.review_count || 0,
        badge: null,
        featured: false,
      }))
    : landingData.products.map((product, index) => ({
        id: String(product.id),
        numericId: index + 1,
        slug: product.slug,
        name: product.name,
        price: Number(product.price),
        imageUrl: undefined,
        rating: product.rating || 0,
        reviewsCount: product.reviewsCount || 0,
        badge: product.badge,
        featured: product.featured,
      }));

  const handleAdd = (product: DisplayProduct) => {
    const added = addItem(
      {
        product_id: product.numericId,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl || "",
        quantity: 1,
      },
      20,
    );

    if (!added) {
      toast.error("امکان افزودن تعداد بیشتری از این محصول وجود ندارد");
      return;
    }

    toast.success("محصول به سبد خرید اضافه شد");
  };

  return (
    <ul role="list" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => {
        const href = product.slug
          ? `/products/${product.slug}`
          : `/products/${product.id}`;

        return (
          <li key={product.id} className="min-w-0">
            <article
              className={cn(
                "group flex h-full min-h-[430px] flex-col overflow-hidden rounded-2xl border bg-white shadow-card transition-[border-color,box-shadow] duration-200 hover:shadow-card-hover",
                product.featured
                  ? "border-primary/25"
                  : "border-border-soft hover:border-primary/20",
              )}
            >
              <Link
                href={href}
                aria-label={`مشاهده ${product.name}`}
                className="relative block aspect-[4/3] overflow-hidden border-b border-border-soft bg-bg-soft"
              >
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain p-5 transition-transform duration-200 group-hover:scale-[1.025]"
                  />
                ) : (
                  <ProductPlaceholder className="h-full w-full p-6" />
                )}
                <div className="absolute right-3 top-3 flex flex-col gap-2">
                  {product.badge && (
                    <span className="rounded-lg bg-discount px-2.5 py-1 text-xs font-semibold text-white">
                      {product.badge}
                    </span>
                  )}
                  {product.featured && (
                    <span className="rounded-lg bg-primary px-2.5 py-1 text-xs font-semibold text-white">
                      ویژه
                    </span>
                  )}
                </div>
              </Link>

              <div className="flex flex-1 flex-col p-5">
                {product.rating > 0 && (
                  <div className="mb-2.5 flex items-center gap-1.5 text-xs text-text-muted">
                    <Star
                      className="h-4 w-4 fill-warning text-warning"
                      aria-hidden="true"
                    />
                    <span className="font-medium text-text-secondary">
                      {product.rating.toLocaleString("fa-IR")}
                    </span>
                    {product.reviewsCount > 0 && (
                      <span>
                        از {product.reviewsCount.toLocaleString("fa-IR")} نظر
                      </span>
                    )}
                  </div>
                )}

                <Link href={href} className="rounded-md">
                  <h3 className="text-[15px] font-semibold leading-7 text-dark transition-colors duration-200 group-hover:text-primary">
                    {product.name}
                  </h3>
                </Link>

                <p className="mt-2 text-xs leading-6 text-text-muted">
                  مشاهده مشخصات، سازگاری و شرایط نصب
                </p>
                <p className="mt-4 text-lg font-semibold tabular-nums text-primary">
                  {formatPrice(product.price)}
                </p>

                <button
                  type="button"
                  onClick={() => handleAdd(product)}
                  className="mt-auto flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-dark"
                >
                  <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                  افزودن به سبد خرید
                </button>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
