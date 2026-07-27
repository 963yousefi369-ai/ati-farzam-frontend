import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const CATEGORY_IMAGES: Record<string, string> = {
  car: "/images/categories/car.webp",
  user: "/images/categories/personal.webp",
  users: "/images/categories/personal.webp",
  personal: "/images/categories/personal.webp",
  motorcycle: "/images/categories/motorcycle.webp",
  bike: "/images/categories/motorcycle.webp",
  truck: "/images/categories/truck.webp",
  fleet: "/images/categories/truck.webp",
};

interface CategoryItem {
  id?: string;
  href?: string;
  label?: string;
  desc?: string;
  icon?: string;
  image_url?: string | null;
}

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

export default function CategoryCards({ items }: { items?: CategoryItem[] }) {
  const categories = items?.length ? items : DEFAULT_CATEGORIES;

  return (
    <ul role="list" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((category) => {
        const href = category.href || "/products";
        const label = category.label || "دسته‌بندی محصول";
        const description = category.desc || "مشاهده محصولات مرتبط";
        const imageSrc =
          category.image_url ||
          CATEGORY_IMAGES[category.icon || "car"] ||
          CATEGORY_IMAGES.car;

        return (
          <li key={category.id || `${href}-${label}`} className="min-w-0">
            <Link
              href={href}
              aria-label={`مشاهده ${label}`}
              className="group flex h-full min-h-[340px] flex-col overflow-hidden rounded-2xl border border-border-soft bg-white shadow-card transition-[border-color,box-shadow] duration-200 hover:border-primary/25 hover:shadow-card-hover"
            >
              <span className="relative block aspect-[4/3] overflow-hidden border-b border-border-soft bg-bg-soft">
                <Image
                  src={imageSrc}
                  alt={label}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain p-5 transition-transform duration-200 group-hover:scale-[1.025]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-5 bottom-0 h-0.5 origin-right scale-x-0 bg-accent transition-transform duration-200 group-hover:scale-x-100"
                />
              </span>

              <span className="flex flex-1 flex-col p-5">
                <strong className="text-base font-semibold leading-7 text-dark transition-colors duration-200 group-hover:text-primary">
                  {label}
                </strong>
                <span className="mt-2 block text-sm leading-7 text-text-muted">
                  {description}
                </span>
                <span className="mt-auto flex items-center gap-2 pt-5 text-sm font-semibold text-primary">
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
