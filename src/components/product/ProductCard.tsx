"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ImageOff, Phone, ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/lib/store/cart";
import { useShopStatus } from "@/lib/store/shop-status";
import { cn, formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: {
    id: string | number;
    name: string;
    price: number;
    compare_price?: number;
    in_stock?: boolean;
    stock?: number;
    slug?: string;
    rating?: number;
    review_count?: number;
  };
  imageUrl?: string;
  variant?: "grid" | "featured";
  priority?: boolean;
}

export default function ProductCard({
  product,
  imageUrl,
  variant = "grid",
  priority = false,
}: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const { shopEnabled, maxOrderQuantity } = useShopStatus();

  const productHref = `/products/${product.slug || product.id}`;
  const isOutOfStock = product.in_stock === false || product.stock === 0;
  const hasDiscount = Boolean(
    product.compare_price && product.compare_price > product.price,
  );
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.compare_price!) * 100)
    : 0;
  const rating = product.rating || 0;
  const reviewCount = product.review_count || 0;
  const hasLowStock =
    !isOutOfStock &&
    typeof product.stock === "number" &&
    product.stock > 0 &&
    product.stock <= 5;

  const handleQuickAdd = () => {
    if (!shopEnabled) return;

    if (isOutOfStock) {
      toast.error("این محصول در حال حاضر موجود نیست");
      return;
    }

    const numericId = Number(product.id);
    if (!Number.isFinite(numericId)) {
      toast.error("شناسه محصول معتبر نیست");
      return;
    }

    const added = addItem(
      {
        product_id: numericId,
        name: product.name,
        price: product.price,
        imageUrl: imageUrl || "",
        quantity: 1,
      },
      maxOrderQuantity,
    );

    if (!added) {
      toast.error(
        `حداکثر ${maxOrderQuantity.toLocaleString("fa-IR")} عدد از این محصول قابل سفارش است`,
      );
      return;
    }

    toast.success("محصول به سبد خرید اضافه شد");
  };

  const toggleWishlist = () => {
    const nextState = !wishlisted;
    setWishlisted(nextState);
    toast.success(
      nextState ? "به علاقه‌مندی‌ها اضافه شد" : "از علاقه‌مندی‌ها حذف شد",
    );
  };

  return (
    <article className="h-full">
      <Card
        className={cn(
          "group flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-card transition-[border-color,box-shadow] duration-200 hover:shadow-card-hover",
          variant === "featured"
            ? "border-primary/25"
            : "border-border-soft hover:border-primary/20",
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden border-b border-border-soft bg-bg-soft",
            variant === "featured" ? "aspect-[5/4]" : "aspect-[4/3]",
          )}
        >
          <Link
            href={productHref}
            aria-label={`مشاهده ${product.name}`}
            className="absolute inset-0"
          >
            {imageUrl ? (
              <>
                {!imageLoaded && (
                  <span
                    className="absolute inset-0 animate-shimmer"
                    aria-hidden="true"
                  />
                )}
                <Image
                  src={imageUrl}
                  alt={product.name}
                  fill
                  priority={priority}
                  fetchPriority={priority ? "high" : "auto"}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  onLoad={() => setImageLoaded(true)}
                  className={cn(
                    "object-contain p-5 transition-[opacity,transform,filter] duration-200 group-hover:scale-[1.025]",
                    imageLoaded ? "opacity-100" : "opacity-0",
                    isOutOfStock && "grayscale-[45%]",
                  )}
                />
              </>
            ) : (
              <span className="flex h-full flex-col items-center justify-center gap-2 text-center text-text-muted">
                <ImageOff className="h-8 w-8" aria-hidden="true" />
                <span className="text-xs">تصویر محصول موجود نیست</span>
              </span>
            )}
          </Link>

          <div className="absolute right-3 top-3 z-10 flex flex-col items-start gap-2">
            {variant === "featured" && (
              <Badge className="rounded-lg bg-primary text-white">
                پیشنهاد ویژه
              </Badge>
            )}
            {hasDiscount && (
              <Badge className="rounded-lg bg-discount text-white">
                {discountPercent.toLocaleString("fa-IR")}٪ تخفیف
              </Badge>
            )}
            {isOutOfStock && (
              <Badge className="rounded-lg bg-error-light text-error-text">
                ناموجود
              </Badge>
            )}
          </div>

          <button
            type="button"
            onClick={toggleWishlist}
            aria-pressed={wishlisted}
            aria-label={
              wishlisted ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"
            }
            className="absolute left-3 top-3 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-border-soft bg-white text-text-muted shadow-soft transition-[color,border-color,background-color] duration-200 hover:border-error/20 hover:bg-error-light hover:text-error"
          >
            <Heart
              className={cn(
                "h-[18px] w-[18px]",
                wishlisted && "fill-error text-error",
              )}
              aria-hidden="true"
            />
          </button>
        </div>

        <CardContent className="flex flex-1 flex-col p-5">
          {rating > 0 && (
            <div className="mb-2.5 flex items-center gap-1.5 text-xs text-text-muted">
              <Star
                className="h-4 w-4 fill-warning text-warning"
                aria-hidden="true"
              />
              <span className="font-medium text-text-secondary">
                {rating.toLocaleString("fa-IR")}
              </span>
              {reviewCount > 0 && (
                <span>از {reviewCount.toLocaleString("fa-IR")} نظر</span>
              )}
            </div>
          )}

          <Link href={productHref} className="rounded-md">
            <h3 className="text-[15px] font-semibold leading-7 text-dark transition-colors duration-200 group-hover:text-primary">
              {product.name}
            </h3>
          </Link>

          <p className="mt-1.5 text-xs leading-6 text-text-muted">
            مشاهده مشخصات، سازگاری و شرایط نصب
          </p>

          {hasLowStock && (
            <p className="mt-2 text-xs font-medium text-warning-dark">
              تنها {product.stock!.toLocaleString("fa-IR")} عدد باقی مانده
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-baseline gap-2">
            <p className="text-lg font-semibold tabular-nums text-primary">
              {product.price > 0
                ? formatPrice(product.price)
                : "برای قیمت تماس بگیرید"}
            </p>
            {hasDiscount && (
              <p className="text-xs tabular-nums text-text-muted line-through">
                {formatPrice(product.compare_price!)}
              </p>
            )}
          </div>

          <div className="mt-auto pt-5">
            {!shopEnabled ? (
              <Link
                href="/contact"
                className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-dark"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                دریافت مشاوره
              </Link>
            ) : (
              <button
                type="button"
                onClick={handleQuickAdd}
                disabled={isOutOfStock}
                className={cn(
                  "flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition-colors duration-200",
                  isOutOfStock
                    ? "cursor-not-allowed bg-bg-muted text-text-muted opacity-60"
                    : "cursor-pointer bg-primary text-white hover:bg-primary-dark",
                )}
              >
                <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                {isOutOfStock ? "در حال حاضر ناموجود" : "افزودن به سبد خرید"}
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </article>
  );
}
