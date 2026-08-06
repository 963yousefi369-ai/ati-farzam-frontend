import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Car, User, Bike, Truck, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Canonical slugs                                                    */
/* ------------------------------------------------------------------ */

export type CategorySlug = "car" | "motorcycle" | "truck" | "personal" | "bus";

/* ------------------------------------------------------------------ */
/*  Image map — full explicit paths (extension is greppable)           */
/* ------------------------------------------------------------------ */

export const CATEGORY_IMAGES: Record<CategorySlug, string> = {
  car: "/images/categories/car.png",
  motorcycle: "/images/categories/motorcycle.png",
  truck: "/images/categories/truck.png",
  personal: "/images/categories/personal.png",
  bus: "/images/categories/bus.png",
};

/* ------------------------------------------------------------------ */
/*  Aliases: legacy icon values & alternate slugs → canonical slug     */
/* ------------------------------------------------------------------ */

const ALIASES: Record<string, CategorySlug> = {
  car: "car",
  khodro: "car",
  motorcycle: "motorcycle",
  bike: "motorcycle",
  motor: "motorcycle",
  truck: "truck",
  fleet: "truck",
  heavy: "truck",
  personal: "personal",
  user: "personal",
  users: "personal",
  bus: "bus",
  van: "bus",
  minibus: "bus",
};

/* ------------------------------------------------------------------ */
/*  Fallback lucide icons per canonical slug                            */
/* ------------------------------------------------------------------ */

const FALLBACK_ICONS: Record<CategorySlug, LucideIcon> = {
  car: Car,
  motorcycle: Bike,
  truck: Truck,
  personal: User,
  bus: MapPin,
};

/* ------------------------------------------------------------------ */
/*  Normalize: lowercase, trim, Persian/Arabic digits → latin,         */
/*  spaces/underscores → hyphens, strip leading/trailing hyphens       */
/* ------------------------------------------------------------------ */

export function normalizeSlug(raw: string): string {
  return raw
    .toLowerCase()
    .trim()
    .replace(/[۰-۹]/g, (d) =>
      String.fromCharCode(d.charCodeAt(0) - 0x06f0 + 48),
    )
    .replace(/[٠-٩]/g, (d) =>
      String.fromCharCode(d.charCodeAt(0) - 0x0660 + 48),
    )
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* ------------------------------------------------------------------ */
/*  Internal: resolve a raw key through aliases → canonical slug        */
/* ------------------------------------------------------------------ */

function lookupSlug(raw: string): CategorySlug | undefined {
  const norm = normalizeSlug(raw);
  if (norm in ALIASES) return ALIASES[norm];
  if (norm in CATEGORY_IMAGES) return norm as CategorySlug;
  return undefined;
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface CategoryItem {
  id?: string;
  slug?: string;
  href?: string;
  label?: string;
  desc?: string;
  icon?: string;
  image?: string | null;
  image_url?: string | null;
}

/* ------------------------------------------------------------------ */
/*  Resolution order                                                   */
/*  a) explicit image / image_url field                                */
/*  b) hardcoded map lookup on normalized slug (slug || id)            */
/*  c) hardcoded map lookup on normalized icon (back-compat)           */
/*  d) fallback: lucide icon rendered in the tile                      */
/* ------------------------------------------------------------------ */

function resolveCategory(
  category: CategoryItem,
): { type: "image"; src: string } | { type: "icon"; Icon: LucideIcon } {
  // a) explicit CMS/API image
  const explicit = category.image || category.image_url;
  if (explicit) return { type: "image", src: explicit };

  // b) slug-based
  const slugSource = category.slug || category.id;
  if (slugSource) {
    const slug = lookupSlug(slugSource);
    if (slug) return { type: "image", src: CATEGORY_IMAGES[slug] };
  }

  // c) icon-based (back-compat)
  if (category.icon) {
    const slug = lookupSlug(category.icon);
    if (slug) return { type: "image", src: CATEGORY_IMAGES[slug] };
  }

  // d) fallback — best-effort icon
  const fallbackSlug =
    (slugSource && lookupSlug(slugSource)) ||
    (category.icon && lookupSlug(category.icon)) ||
    ("car" as CategorySlug);
  return { type: "icon", Icon: FALLBACK_ICONS[fallbackSlug] };
}

/* ------------------------------------------------------------------ */
/*  Default categories                                                 */
/* ------------------------------------------------------------------ */

const DEFAULT_CATEGORIES: CategoryItem[] = [
  {
    id: "vehicle",
    href: "/products?cat=vehicle",
    label: "ردیاب خودرو",
    desc: "کنترل امنیت و موقعیت لحظه‌ای خودروهای سواری",
    icon: "car",
  },
  {
    id: "personal",
    href: "/products?cat=personal",
    label: "ردیاب شخصی",
    desc: "موقعیت‌یابی امن و آرامش بیشتر برای خانواده",
    icon: "user",
  },
  {
    id: "motorcycle",
    href: "/products?cat=motorcycle",
    label: "ردیاب موتورسیکلت",
    desc: "نصب مخفی، هشدار جابه‌جایی و ردیابی سریع",
    icon: "motorcycle",
  },
  {
    id: "fleet",
    href: "/products?cat=fleet",
    label: "ردیاب ناوگان",
    desc: "کنترل مسیر، توقف‌ها و عملکرد خودروهای سازمانی",
    icon: "truck",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CategoryCards({ items }: { items?: CategoryItem[] }) {
  const categories = items?.length ? items : DEFAULT_CATEGORIES;

  return (
    <ul
      role="list"
      className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4"
    >
      {categories.map((category, index) => {
        const href = category.href || "/products";
        const label = category.label || "دسته‌بندی محصول";
        const description = category.desc || "مشاهده محصولات مرتبط";
        const title = label.replace(/^ردیاب\s+/, "") || "دسته‌بندی";
        const resolved = resolveCategory(category);

        return (
          <li
            key={category.id || `${href}-${label}`}
            className="w-[65vw] max-w-[240px] shrink-0 snap-start sm:w-auto sm:max-w-none"
          >
            <Link
              href={href}
              aria-label={`مشاهده ${label}`}
              className="group flex h-full min-h-[220px] flex-col overflow-hidden rounded-2xl border border-border-soft bg-white shadow-card transition-[border-color,box-shadow] duration-200 hover:border-primary/25 hover:shadow-card-hover sm:min-h-[240px]"
            >
              <span className="relative block aspect-[4/3] overflow-hidden border-b border-border-soft bg-bg-soft">
                {resolved.type === "image" ? (
                  <Image
                    src={resolved.src}
                    alt={`ردیاب ${title}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain p-3 transition-transform duration-200 group-hover:scale-[1.025]"
                    priority={index < 2}
                    loading={index >= 2 ? "lazy" : undefined}
                  />
                ) : (
                  <resolved.Icon className="absolute inset-0 m-auto h-12 w-12 text-text-muted/50" />
                )}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-3 bottom-0 h-0.5 origin-right scale-x-0 bg-accent transition-transform duration-200 group-hover:scale-x-100"
                />
              </span>

              <span className="flex flex-1 flex-col p-3">
                <strong className="text-sm font-semibold leading-6 text-dark transition-colors duration-200 group-hover:text-primary">
                  {label}
                </strong>
                <span className="mt-1 block text-xs leading-6 text-text-muted">
                  {description}
                </span>
                <span className="mt-auto flex items-center gap-2 pt-3 text-sm font-semibold text-primary">
                  مشاهده محصولات
                  <ArrowLeft
                    className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
