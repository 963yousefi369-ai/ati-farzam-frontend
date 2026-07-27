import { Clock3, Headphones, MapPin, ShieldCheck } from "lucide-react";

const ICONS = {
  clock: Clock3,
  headphones: Headphones,
  map_pin: MapPin,
  shield_check: ShieldCheck,
};

type CredibilityIcon = keyof typeof ICONS;

interface CredibilityItem {
  icon?: CredibilityIcon;
  label?: string;
  desc?: string;
}

const DEFAULT_ITEMS: CredibilityItem[] = [
  {
    icon: "map_pin",
    label: "نصب در شهرهای اصلی",
    desc: "هماهنگی نصب حضوری یا ارسال راهنمای نصب",
  },
  {
    icon: "headphones",
    label: "پشتیبانی پاسخ‌گو",
    desc: "راهنمای انتخاب، فعال‌سازی و پیگیری پس از خرید",
  },
  {
    icon: "shield_check",
    label: "ضمانت اصالت و سلامت",
    desc: "تست دستگاه پیش از ارسال و ارائه ضمانت معتبر",
  },
  {
    icon: "clock",
    label: "خدمات کامل پس از فروش",
    desc: "فعال‌سازی سیم‌کارت، آموزش پنل و پیگیری نصب",
  },
];

export default function CredibilityBar({
  items,
}: {
  items?: CredibilityItem[];
}) {
  const visibleItems = items?.length ? items : DEFAULT_ITEMS;

  return (
    <div className="overflow-hidden rounded-2xl border border-border-soft bg-border-soft shadow-card">
      <ul
        role="list"
        aria-label="دلایل اعتماد به آتی فرزام"
        className="grid grid-cols-2 gap-px lg:grid-cols-4"
      >
        {visibleItems.map((item) => {
          const Icon = ICONS[item.icon ?? "shield_check"] ?? ShieldCheck;

          return (
            <li
              key={`${item.label}-${item.desc}`}
              className="group relative flex min-h-[124px] flex-col items-start gap-3 bg-white p-4 transition-colors duration-200 hover:bg-bg-soft sm:min-h-[132px] sm:flex-row sm:gap-4 sm:p-5 lg:p-6"
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-light-tint text-primary transition-colors duration-200 group-hover:border-accent/20 group-hover:bg-success-light group-hover:text-accent-dark"
                aria-hidden="true"
              >
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </span>

              <span className="min-w-0 pt-0.5">
                <strong className="block text-sm font-semibold leading-6 text-dark">
                  {item.label || "اعتماد مشتریان"}
                </strong>
                <span className="mt-1 block text-[11px] leading-5 text-text-muted sm:mt-1.5 sm:text-xs sm:leading-6">
                  {item.desc || "فروش، نصب و پشتیبانی تخصصی ردیاب GPS"}
                </span>
              </span>

              <span
                className="absolute inset-x-5 bottom-0 h-0.5 origin-right scale-x-0 bg-accent transition-transform duration-200 group-hover:scale-x-100"
                aria-hidden="true"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
