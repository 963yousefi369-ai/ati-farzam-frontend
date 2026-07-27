import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Headphones,
  MapPin,
  ShieldCheck,
  Signal,
  Wrench,
} from "lucide-react";

interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  mobileImageUrl?: string;
  foregroundImageUrl?: string;
  foregroundImageUrlMobile?: string;
  cta_text?: string;
  cta_link?: string;
  cta2_text?: string;
  cta2_link?: string;
}

interface HeroSliderProps {
  banners?: Banner[];
}

const FALLBACK_BANNER: Banner = {
  id: "default",
  title: "کنترل خودرو، هر لحظه و هرجا",
  subtitle:
    "ردیاب‌های GPS آتی فرزام برای امنیت خودرو و مدیریت دقیق ناوگان؛ همراه با نصب تخصصی و پشتیبانی پاسخ‌گو.",
  cta_text: "انتخاب ردیاب مناسب",
  cta_link: "/products",
  cta2_text: "مشاوره رایگان خرید",
  cta2_link: "/contact",
};

const BENEFITS = [
  { icon: ShieldCheck, label: "گارانتی معتبر" },
  { icon: Wrench, label: "نصب تخصصی" },
  { icon: Headphones, label: "پشتیبانی پاسخ‌گو" },
];

export default function HeroSlider({ banners }: HeroSliderProps) {
  const banner = banners?.find((item) => item.title?.trim()) ?? FALLBACK_BANNER;
  const desktopBackground = banner.imageUrl;
  const mobileBackground = banner.mobileImageUrl || banner.imageUrl;
  const desktopForeground = banner.foregroundImageUrl;
  const mobileForeground =
    banner.foregroundImageUrlMobile || banner.foregroundImageUrl;

  return (
    <section
      className="relative isolate min-h-[540px] overflow-hidden bg-dark sm:min-h-[620px]"
      aria-labelledby="hero-title"
    >
      {desktopBackground && (
        <div className="absolute inset-0 -z-20" aria-hidden="true">
          <Image
            src={desktopBackground}
            alt=""
            fill
            priority
            sizes="100vw"
            className="hidden object-cover object-center md:block"
          />
          <Image
            src={mobileBackground || desktopBackground}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center md:hidden"
          />
        </div>
      )}

      <div
        className="absolute inset-0 -z-10 bg-dark/70 md:bg-gradient-to-l md:from-dark/95 md:via-dark/75 md:to-dark/25"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-dark/50 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto grid min-h-[540px] max-w-7xl grid-cols-1 items-center gap-8 px-4 py-10 sm:min-h-[620px] sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(360px,.8fr)] lg:gap-14 lg:px-8 lg:py-20">
        <div className="min-w-0 max-w-2xl">
          <div className="mb-5 inline-flex min-h-9 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 text-sm font-medium text-white/90">
            <Signal className="h-4 w-4 text-accent" aria-hidden="true" />
            ردیابی لحظه‌ای با پوشش سراسری
          </div>

          <h1
            id="hero-title"
            className="max-w-full break-words text-[clamp(2rem,10vw,4.75rem)] font-bold leading-[1.18] text-white sm:max-w-[13ch] sm:text-[clamp(2.4rem,5.5vw,4.75rem)]"
          >
            {banner.title}
          </h1>

          {banner.subtitle && (
            <p className="mt-6 max-w-[60ch] text-base leading-8 text-white/80 sm:text-lg sm:leading-9">
              {banner.subtitle}
            </p>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={banner.cta_link || "/products"}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-7 text-base font-semibold text-dark transition-colors hover:bg-accent-light"
            >
              {banner.cta_text || "انتخاب ردیاب مناسب"}
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href={banner.cta2_link || "/contact"}
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/25 bg-white/10 px-6 text-base font-medium text-white transition-colors hover:border-white/40 hover:bg-white/15"
            >
              {banner.cta2_text || "مشاوره رایگان خرید"}
            </Link>
          </div>

          <ul
            className="mt-7 grid grid-cols-3 gap-2 border-t border-white/15 pt-5"
            aria-label="مزایای خرید از آتی فرزام"
          >
            {BENEFITS.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex min-h-10 flex-col items-center gap-2 text-center text-[11px] font-medium leading-5 text-white/80 sm:flex-row sm:text-right sm:text-sm"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-accent">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-center lg:justify-end">
          {desktopForeground ? (
            <div className="relative w-full max-w-[520px]">
              <Image
                src={desktopForeground}
                alt={banner.title}
                width={760}
                height={620}
                priority
                sizes="(max-width: 1024px) 90vw, 42vw"
                className="hidden h-auto max-h-[520px] w-full object-contain drop-shadow-2xl md:block"
              />
              <Image
                src={mobileForeground || desktopForeground}
                alt={banner.title}
                width={760}
                height={620}
                priority
                sizes="90vw"
                className="h-auto max-h-[260px] w-full object-contain drop-shadow-2xl sm:max-h-[340px] md:hidden"
              />
            </div>
          ) : (
            <div className="w-full max-w-sm rounded-2xl border border-white/15 bg-dark/55 p-5 shadow-elevated">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs text-white/55">وضعیت ردیاب</p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    خودرو آنلاین است
                  </p>
                </div>
                <span className="flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1.5 text-xs font-medium text-accent">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  متصل
                </span>
              </div>
              <div className="mt-5 flex min-h-40 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <div className="text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-dark">
                    <MapPin className="h-6 w-6" />
                  </span>
                  <p className="mt-3 text-sm font-semibold text-white">
                    موقعیت لحظه‌ای خودرو
                  </p>
                  <p className="mt-1 text-xs text-white/55">
                    به‌روزرسانی چند ثانیه پیش
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
