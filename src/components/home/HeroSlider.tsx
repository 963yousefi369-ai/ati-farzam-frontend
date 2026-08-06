"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Headphones,
  Pause,
  Play,
  ShieldCheck,
  Signal,
  Wrench,
} from "lucide-react";

const DEFAULT_AUTOPLAY_MS = 6000;
const SWIPE_THRESHOLD = 48;

interface Banner {
  id?: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  mobileImageUrl?: string;
  foregroundImageUrl?: string;
  foregroundImageUrlMobile?: string;
  image_url?: string;
  mobile_image_url?: string;
  foreground_image_url?: string;
  foreground_image_url_mobile?: string;
  cta_text?: string;
  cta_link?: string;
  cta2_text?: string;
  cta2_link?: string;
}

interface HeroSliderProps {
  banners?: Banner[];
  /** فاصلهٔ تعویض خودکار اسلایدها برحسب میلی‌ثانیه */
  autoplayMs?: number;
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

interface ResolvedSlide {
  key: string;
  title: string;
  subtitle?: string;
  desktopBackground?: string;
  mobileBackground?: string;
  desktopForeground?: string;
  mobileForeground?: string;
  showForeground: boolean;
  ctaText: string;
  ctaLink: string;
  cta2Text: string;
  cta2Link: string;
}

function resolveSlide(banner: Banner, position: number): ResolvedSlide {
  const declaredDesktopBackground = banner.imageUrl || banner.image_url;
  const declaredMobileBackground =
    banner.mobileImageUrl || banner.mobile_image_url;
  const desktopForeground =
    banner.foregroundImageUrl || banner.foreground_image_url;
  const mobileForeground =
    banner.foregroundImageUrlMobile ||
    banner.foreground_image_url_mobile ||
    desktopForeground;
  const desktopBackground = declaredDesktopBackground || desktopForeground;
  const mobileBackground =
    declaredMobileBackground ||
    declaredDesktopBackground ||
    mobileForeground ||
    desktopForeground;

  return {
    key: banner.id ? String(banner.id) : `slide-${position}`,
    title: banner.title,
    subtitle: banner.subtitle,
    desktopBackground,
    mobileBackground: mobileBackground || desktopBackground,
    desktopForeground,
    mobileForeground: mobileForeground || desktopForeground,
    showForeground: Boolean(desktopForeground && declaredDesktopBackground),
    ctaText: banner.cta_text || "انتخاب ردیاب مناسب",
    ctaLink: banner.cta_link || "/products",
    cta2Text: banner.cta2_text || "مشاوره رایگان خرید",
    cta2Link: banner.cta2_link || "/contact",
  };
}

export default function HeroSlider({
  banners,
  autoplayMs = DEFAULT_AUTOPLAY_MS,
}: HeroSliderProps) {
  const slides = useMemo<ResolvedSlide[]>(() => {
    const valid = (banners ?? []).filter((item) => item.title?.trim());
    const source = valid.length > 0 ? valid : [FALLBACK_BANNER];
    return source.map(resolveSlide);
  }, [banners]);

  const count = slides.length;
  const isCarousel = count > 1;

  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTabHidden, setIsTabHidden] = useState(false);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);

  /* ── اگر تعداد اسلایدها عوض شد، ایندکس را در محدوده نگه دار ── */
  useEffect(() => {
    setIndex((current) => (current > count - 1 ? 0 : current));
  }, [count]);

  /* ── احترام به prefers-reduced-motion (الزام DESIGN.md) ── */
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  /* ── توقف پخش وقتی تب مرورگر در پس‌زمینه است ── */
  useEffect(() => {
    const sync = () => setIsTabHidden(document.hidden);
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  const isPlaying =
    isCarousel && !reduceMotion && !isHovered && !isTabHidden && !isUserPaused;

  /* ── پخش خودکار ── */
  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, autoplayMs);
    return () => window.clearInterval(timer);
  }, [isPlaying, count, autoplayMs]);

  const goTo = useCallback(
    (target: number) => setIndex(((target % count) + count) % count),
    [count],
  );
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  /* ── ناوبری با کیبورد (RTL: فلش چپ = بعدی) ── */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!isCarousel) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goNext();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goPrev();
    }
  };

  /* ── سوایپ روی موبایل ── */
  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (!isCarousel || touchStartX.current === null) return;
    const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    if (delta < 0) goNext();
    else goPrev();
  };

  return (
    <section
      className="group/hero relative isolate min-h-[560px] overflow-hidden bg-dark sm:min-h-[620px]"
      aria-labelledby="hero-title"
      aria-roledescription={isCarousel ? "اسلایدر" : undefined}
      aria-label={isCarousel ? "بنرهای اصلی آتی فرزام" : undefined}
      tabIndex={isCarousel ? 0 : undefined}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <style>{`
        @keyframes hero-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes hero-drift { from { transform: scale(1.08); } to { transform: scale(1); } }
        @media (prefers-reduced-motion: reduce) {
          .hero-progress-bar, .hero-drift { animation: none !important; }
        }
      `}</style>

      {/* ── پس‌زمینه‌های روی‌هم با محو نرم ── */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {slides.map((slide, position) => {
          const isActive = position === index;
          if (!slide.desktopBackground) return null;
          return (
            <div
              key={`bg-${slide.key}`}
              className={`absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                className="hero-drift absolute inset-0"
                style={
                  isActive
                    ? {
                        animation: `hero-drift ${autoplayMs + 2000}ms linear forwards`,
                      }
                    : undefined
                }
              >
                <Image
                  src={slide.desktopBackground}
                  alt=""
                  fill
                  priority={position === 0}
                  loading={position === 0 ? undefined : "lazy"}
                  sizes="100vw"
                  className="hidden object-cover object-center md:block"
                />
                <Image
                  src={slide.mobileBackground || slide.desktopBackground}
                  alt=""
                  fill
                  priority={position === 0}
                  loading={position === 0 ? undefined : "lazy"}
                  sizes="100vw"
                  className="object-cover object-[58%_center] md:hidden"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── لایه‌های خوانایی متن ── */}
      <div
        className="absolute inset-0 z-10 bg-gradient-to-t from-dark via-dark/75 to-dark/20 md:bg-gradient-to-l md:from-dark/90 md:via-dark/55 md:to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 z-10 h-72 bg-gradient-to-t from-dark to-transparent md:h-40 md:from-dark/50"
        aria-hidden="true"
      />

      {/* ── محتوای اسلایدها (همه در یک سلول گرید تا ارتفاع ثابت بماند) ── */}
      <div
        className="relative z-20 mx-auto grid min-h-[560px] max-w-7xl grid-cols-1 grid-rows-1 px-4 pb-20 pt-24 sm:min-h-[620px] sm:px-6 sm:pb-24 sm:pt-14 lg:px-8 lg:py-20"
        aria-live="polite"
        aria-atomic="false"
      >
        {slides.map((slide, position) => {
          const isActive = position === index;
          return (
            <div
              key={`content-${slide.key}`}
              role={isCarousel ? "group" : undefined}
              aria-roledescription={isCarousel ? "اسلاید" : undefined}
              aria-label={
                isCarousel ? `اسلاید ${position + 1} از ${count}` : undefined
              }
              aria-hidden={!isActive}
              className={`col-start-1 row-start-1 grid grid-cols-1 items-end transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] md:items-center ${
                slide.showForeground
                  ? "lg:grid-cols-[minmax(0,1fr)_minmax(360px,.8fr)] lg:gap-14"
                  : ""
              } ${
                isActive
                  ? "visible translate-y-0 opacity-100"
                  : "invisible translate-y-3 opacity-0"
              }`}
            >
              <div className="min-w-0 max-w-xl md:max-w-2xl">
                <div className="mb-3 inline-flex min-h-8 items-center gap-2 rounded-full border border-white/20 bg-dark/35 px-3 text-xs font-medium text-white/90 backdrop-blur-sm sm:mb-5 sm:min-h-9 sm:px-3.5 sm:text-sm">
                  <Signal className="h-4 w-4 text-accent" aria-hidden="true" />
                  ردیابی لحظه‌ای با پوشش سراسری
                </div>

                <h1
                  id={isActive ? "hero-title" : undefined}
                  className="max-w-[15ch] break-words text-[clamp(1.9rem,8vw,2.75rem)] font-bold leading-[1.2] text-white sm:max-w-[13ch] sm:text-[clamp(2.4rem,5.5vw,4.75rem)]"
                >
                  {slide.title}
                </h1>

                {slide.subtitle && (
                  <p className="mt-3 line-clamp-3 max-w-[55ch] text-sm leading-6 text-white/85 sm:mt-6 sm:text-lg sm:leading-9">
                    {slide.subtitle}
                  </p>
                )}

                <div className="mt-5 grid grid-cols-1 gap-2.5 min-[390px]:grid-cols-2 sm:mt-8 sm:flex sm:items-center sm:gap-3">
                  <Link
                    href={slide.ctaLink}
                    tabIndex={isActive ? undefined : -1}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-dark transition-colors hover:bg-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dark sm:min-h-12 sm:px-7 sm:text-base"
                  >
                    {slide.ctaText}
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href={slide.cta2Link}
                    tabIndex={isActive ? undefined : -1}
                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/25 bg-dark/30 px-4 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dark sm:min-h-12 sm:px-6 sm:text-base"
                  >
                    {slide.cta2Text}
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

              {slide.showForeground && slide.desktopForeground && (
                <div className="hidden items-center justify-center md:flex lg:justify-end">
                  <div className="relative w-full max-w-[520px]">
                    <Image
                      src={slide.desktopForeground}
                      alt={slide.title}
                      width={760}
                      height={620}
                      priority={position === 0}
                      loading={position === 0 ? undefined : "lazy"}
                      sizes="(max-width: 1024px) 90vw, 42vw"
                      className="hidden h-auto max-h-[520px] w-full object-contain drop-shadow-2xl md:block"
                    />
                    <Image
                      src={slide.mobileForeground || slide.desktopForeground}
                      alt={slide.title}
                      width={760}
                      height={620}
                      priority={position === 0}
                      loading={position === 0 ? undefined : "lazy"}
                      sizes="90vw"
                      className="h-auto max-h-[260px] w-full object-contain drop-shadow-2xl sm:max-h-[340px] md:hidden"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── فلش‌های کناری (فقط دسکتاپ) ── */}
      {isCarousel && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="اسلاید قبلی"
            className="absolute right-4 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-dark/40 text-white opacity-0 backdrop-blur-sm transition-all duration-200 hover:border-white/40 hover:bg-white/15 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent group-hover/hero:opacity-100 lg:flex"
          >
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="اسلاید بعدی"
            className="absolute left-4 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-dark/40 text-white opacity-0 backdrop-blur-sm transition-all duration-200 hover:border-white/40 hover:bg-white/15 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent group-hover/hero:opacity-100 lg:flex"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          </button>
        </>
      )}

      {/* ── دات‌ها + نوار پیشرفت + دکمهٔ پخش/توقف ── */}
      {isCarousel && (
        <div className="absolute inset-x-0 bottom-5 z-30 flex items-center justify-center gap-3 px-4 sm:bottom-7">
          <div
            className="flex items-center gap-2"
            role="tablist"
            aria-label="انتخاب اسلاید"
          >
            {slides.map((slide, position) => {
              const isActive = position === index;
              return (
                <button
                  key={`dot-${slide.key}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`اسلاید ${position + 1}: ${slide.title}`}
                  onClick={() => goTo(position)}
                  className={`relative flex h-9 items-center justify-center focus-visible:outline-none ${
                    isActive ? "w-14 sm:w-20" : "w-9"
                  }`}
                >
                  <span
                    className={`relative block h-1.5 overflow-hidden rounded-full transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] ${
                      isActive
                        ? "w-full bg-white/25"
                        : "w-1.5 bg-white/40 hover:w-4 hover:bg-white/70"
                    }`}
                  >
                    {isActive && (
                      <span
                        key={`progress-${index}-${isPlaying}`}
                        className="hero-progress-bar absolute inset-0 origin-right rounded-full bg-accent"
                        style={
                          isPlaying
                            ? {
                                animation: `hero-progress ${autoplayMs}ms linear forwards`,
                              }
                            : { transform: "scaleX(1)" }
                        }
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          {!reduceMotion && (
            <button
              type="button"
              onClick={() => setIsUserPaused((value) => !value)}
              aria-label={
                isUserPaused ? "پخش خودکار اسلایدها" : "توقف پخش خودکار"
              }
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-dark/40 text-white/80 backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {isUserPaused ? (
                <Play className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Pause className="h-3.5 w-3.5" aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
