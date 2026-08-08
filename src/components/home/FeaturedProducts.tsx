"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
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
  comparePrice?: number;
  imageUrl?: string;
  badge?: string | null;
  featured: boolean;
  inStock: boolean;
}

function ProductCardSkeleton() {
  return (
    <div className="flex min-h-[400px] flex-col overflow-hidden rounded-2xl border border-border-soft bg-white">
      <div className="aspect-[4/3] animate-shimmer" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="h-3 w-20 animate-shimmer rounded-full" />
        <div className="h-4 w-full animate-shimmer rounded-full" />
        <div className="h-4 w-2/3 animate-shimmer rounded-full" />
        <div className="mt-auto h-6 w-28 animate-shimmer rounded-full" />
        <div className="h-11 w-full animate-shimmer rounded-xl" />
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
      <div className="snap-row scrollbar-none" aria-label="در حال بارگذاری محصولات">
        {[0, 1, 2, 3].map((item) => (
          <ProductCardSkeleton key={item} />
        ))}
      </div>
    );
  }

  const products: DisplayProduct[] = apiProducts?.length
    ? apiProducts.map((product) => {
        const price = Number(
          product.effective_price ?? product.discount_price ?? product.price,
        );
        const base = Number(product.price);
        return {
          id: String(product.id),
          numericId: product.id,
          slug: product.slug,
          name: product.name,
          price,
          comparePrice: base > price ? base : undefined,
          imageUrl: product.image || undefined,
          badge: base > price ? "تخفیف" : null,
          featured: false,
          inStock: (product.stock ?? 1) > 0,
        };
      })
    : landingData.products.map((product, index) => ({
        id: String(product.id),
        numericId: index + 1,
        slug: product.slug,
        name: product.name,
        price: Number(product.price),
        comparePrice: undefined,
        imageUrl: undefined,
        badge: product.badge,
        featured: product.featured,
        inStock: true,
      }));

  // روی لندینگ هرگز «محصولی یافت نشد» نشان نمی‌دهیم — سکشن را کامل حذف می‌کنیم.
  if (!products.length) return null;

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
    <ul role="list" className="snap-row scrollbar-none">
      {products.map((product) => {
        const href = product.slug
          ? `/products/${product.slug}`
          : `/products/${product.id}`;

        return (
          <li key={product.id} className="min-w-0">
            <article
              className={cn(
                "group flex h-full min-h-[400px] flex-col overflow-hidden rounded-2xl border bg-white shadow-card",
                "transition-[border-color,box-shadow,transform] duration-200",
                "md:hover:-translate-y-1 md:hover:shadow-card-hover",
                product.featured
                  ? "border-primary/25"
                  : "border-border-soft/70 hover:border-primary/25",
              )}
            >
              <Link
                href={href}
                aria-label={`مشاهده ${product.name}`}
                className="relative block aspect-[4/3] overflow-hidden border-b border-border-soft bg-gradient-to-br from-bg-soft to-light-tint"
              >
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 78vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain p-5 transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]"
                  />
                ) : (
                  <ProductPlaceholder className="h-full w-full p-6" />
                )}

                <div className="absolute right-3 top-3 flex flex-col gap-2">
                  {product.badge && (
                    <span className="rounded-lg bg-gradient-to-br from-discount to-[#b8305f] px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
                      {product.badge}
                    </span>
                  )}
                  {product.featured && (
                    <span className="rounded-lg bg-gradient-to-br from-primary to-primary-dark px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
                      ویژه
                    </span>
                  )}
                </div>

                {!product.inStock && (
                  <span className="absolute inset-x-0 bottom-0 bg-dark/80 py-1.5 text-center text-xs font-semibold text-white backdrop-blur-sm">
                    ناموجود
                  </span>
                )}
              </Link>

              <div className="flex flex-1 flex-col p-4 md:p-5">
                <Link href={href} className="rounded-md">
                  <h3 className="line-clamp-2 text-[14.5px] font-bold leading-[1.7] text-dark transition-colors duration-200 group-hover:text-primary md:text-[15px]">
                    {product.name}
                  </h3>
                </Link>

                <div className="mt-4 flex items-end justify-between gap-2">
                  <div>
                    {product.comparePrice && (
                      <p className="font-num text-xs text-text-muted line-through">
                        {formatPrice(product.comparePrice)}
                      </p>
                    )}
                    <p className="font-num text-[17px] font-bold text-primary">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleAdd(product)}
                  disabled={!product.inStock}
                  className={cn(
                    "mt-4 flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold text-white",
                    "transition-all duration-200 press-effect",
                    product.inStock
                      ? "bg-gradient-to-l from-primary to-primary-dark hover:shadow-[0_10px_24px_-12px_rgba(59,90,128,0.9)]"
                      : "cursor-not-allowed bg-border-base",
                  )}
                >
                  <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                  {product.inStock ? "افزودن به سبد" : "ناموجود"}
                </button>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
