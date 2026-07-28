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
      className="relative isolate min-h-[560px] overflow-hidden bg-dark sm:min-h-[620px]"
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
            className="object-cover object-[58%_center] md:hidden"
          />
        </div>
      )}

      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-dark via-dark/75 to-dark/20 md:bg-gradient-to-l md:from-dark/95 md:via-dark/75 md:to-dark/25"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-72 bg-gradient-to-t from-dark to-transparent md:h-40 md:from-dark/50"
        aria-hidden="true"
      />

      <div className="mx-auto grid min-h-[560px] max-w-7xl grid-cols-1 items-end px-4 pb-7 pt-24 sm:min-h-[620px] sm:px-6 sm:py-14 md:items-center lg:grid-cols-[minmax(0,1fr)_minmax(360px,.8fr)] lg:gap-14 lg:px-8 lg:py-20">
        <div className="min-w-0 max-w-xl md:max-w-2xl">
          <div className="mb-3 inline-flex min-h-8 items-center gap-2 rounded-full border border-white/20 bg-dark/35 px-3 text-xs font-medium text-white/90 backdrop-blur-sm sm:mb-5 sm:min-h-9 sm:px-3.5 sm:text-sm">
            <Signal className="h-4 w-4 text-accent" aria-hidden="true" />
            ردیابی لحظه‌ای با پوشش سراسری
          </div>

          <h1
            id="hero-title"
            className="max-w-[15ch] break-words text-[clamp(1.9rem,8vw,2.75rem)] font-bold leading-[1.2] text-white sm:max-w-[13ch] sm:text-[clamp(2.4rem,5.5vw,4.75rem)]"
          >
            {banner.title}
          </h1>

          {banner.subtitle && (
            <p className="mt-3 line-clamp-3 max-w-[55ch] text-sm leading-6 text-white/85 sm:mt-6 sm:text-lg sm:leading-9">
              {banner.subtitle}
            </p>
          )}

          <div className="mt-5 grid grid-cols-1 gap-2.5 min-[390px]:grid-cols-2 sm:mt-8 sm:flex sm:items-center sm:gap-3">
            <Link
              href={banner.cta_link || "/products"}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-dark transition-colors hover:bg-accent-light sm:min-h-12 sm:px-7 sm:text-base"
            >
              {banner.cta_text || "انتخاب ردیاب مناسب"}
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href={banner.cta2_link || "/contact"}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/25 bg-dark/30 px-4 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/15 sm:min-h-12 sm:px-6 sm:text-base"
            >
              {banner.cta2_text || "مشاوره رایگان خرید"}
            </Link>
          </div>

          <ul
            className="mt-4 grid grid-cols-3 gap-1.5 border-t border-white/15 pt-3 sm:mt-7 sm:gap-2 sm:pt-5"
            aria-label="مزایای خرید از آتی فرزام"
          >
            {BENEFITS.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex min-h-9 items-center justify-center gap-1.5 text-center text-[10px] font-medium leading-4 text-white/85 sm:min-h-10 sm:justify-start sm:gap-2 sm:text-right sm:text-sm"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-accent sm:h-8 sm:w-8">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden items-center justify-center md:flex lg:justify-end">
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
            <div className="w-full max-w-sm rounded-2xl border border-white/20 bg-dark/55 p-5 shadow-elevated">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs text-white/55">وضعیت ردیاب</p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    خودرو آنلاین است
                  </p>
                </div>
                <span className="flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1.5 text-xs font-medium text-accent">
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
