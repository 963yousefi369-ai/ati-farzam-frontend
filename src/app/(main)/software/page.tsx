import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getSettings, getSoftwarePage, djangoImageUrl } from "@/lib/api/django";
import BreadcrumbTrail from "@/components/trail/BreadcrumbTrail";
import SectionTitle from "@/components/shared/SectionTitle";
import ScrollReveal from "@/components/shared/ScrollReveal";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import SoftwareFAQ from "@/components/software/SoftwareFAQ";
import { Button } from "@/components/ui/button";
import DashboardMockup from "@/components/svg/DashboardMockup";
import {
  Monitor,
  Smartphone,
  Bell,
  BarChart3,
  Zap,
  Clock,
  Rocket,
  Headphones,
  Cloud,
  MapPin,
  FileText,
  Download,
  Wifi,
  Battery,
  Shield,
  Users,
  Activity,
  Headset,
  MessageSquare,
  UserPlus,
  Link2,
  Gauge,
  Check,
} from "lucide-react";

const ICON_MAP: Record<string, typeof MapPin> = {
  MapPin,
  BarChart3,
  Bell,
  FileText,
  Monitor,
  Smartphone,
  Zap,
  Clock,
  Rocket,
  Headphones,
  Cloud,
  Shield,
  Users,
  Activity,
  Gauge,
};

export const metadata: Metadata = {
  title: "نرم‌افزار مای فرزام | مدیریت ناوگان",
  description:
    "سامانه آنلاین مدیریت ناوگان و ردیابی خودرو — مشاهده موقعیت لحظه‌ای، گزارش‌گیری و هشدار",
  alternates: { canonical: "/software" },
  openGraph: {
    title: "نرم‌افزار مای فرزام | مدیریت ناوگان",
    description: "سامانه آنلاین مدیریت ناوگان و ردیابی خودرو",
    url: "/software",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "نرم‌افزار مای فرزام | مدیریت ناوگان",
    description: "سامانه آنلاین مدیریت ناوگان و ردیابی خودرو",
  },
};

export const revalidate = 604800;

/* ──────────────────────────────────────────────────
   SINGLE SOURCE OF TRUTH for every number on this page.
   The hero trust strip used to hardcode "۱۰٬۰۰۰" and "۵۰۰+" as literal
   Persian strings while the stats bar read from STATS — so the two could
   silently drift apart again. Everything now formats from these values.
   ────────────────────────────────────────────────── */
const STATS = {
  vehicles: 10000,
  companies: 500,
  uptimeLabel: "۹۹.۹٪",
  supportLabel: "۲۴/۷",
  refreshSeconds: 10,
  trialDays: 14,
} as const;

/** Formats a number with Persian digits and thousand separators. */
const fa = (n: number) => n.toLocaleString("fa-IR");

const FEATURES = [
  {
    icon: MapPin,
    title: "ردیابی لحظه‌ای",
    desc: `مشاهده موقعیت دقیق خودروها روی نقشه با به‌روزرسانی هر ${fa(STATS.refreshSeconds)} ثانیه.`,
    accent: "bg-accent/10 text-accent-dark",
    span: "md:col-span-2",
  },
  {
    icon: BarChart3,
    title: "گزارش‌گیری پیشرفته",
    desc: "تحلیل مسیر، مصرف سوخت، کیلومتر کارکرد و گزارش‌های جامع ناوگان.",
    accent: "bg-primary/10 text-primary",
    span: "",
  },
  {
    icon: Bell,
    title: "هشدارهای فوری",
    desc: "دریافت هشدار سرعت، خروج از محدوده، خاموش و روشن شدن خودرو.",
    accent: "bg-warning/10 text-warning",
    span: "",
  },
  {
    icon: FileText,
    title: "مدیریت اسناد",
    desc: "ثبت بیمه‌نامه، معاینه فنی و سرویس‌های دوره‌ای با یادآوری خودکار.",
    accent: "bg-error/10 text-error",
    span: "md:col-span-2",
  },
];

/* Was four full-width stacked cards inside a max-w-3xl column, which ate
   roughly a full viewport of vertical space to deliver four short lines.
   Same content, now a scannable four-up strip. */
const BENEFITS = [
  {
    icon: Rocket,
    title: "راه‌اندازی سریع",
    desc: "فعال‌سازی در کمتر از ۵ دقیقه بدون دانش فنی.",
  },
  {
    icon: Cloud,
    title: "بدون نصب",
    desc: "دسترسی کامل از مرورگر، بدون نرم‌افزار جانبی.",
  },
  {
    icon: Clock,
    title: "به‌روزرسانی لحظه‌ای",
    desc: `موقعیت خودروها با فاصله کمتر از ${fa(STATS.refreshSeconds)} ثانیه.`,
  },
  {
    icon: Headphones,
    title: "پشتیبانی ۲۴/۷",
    desc: "تیم پشتیبانی در تمام ساعات شبانه‌روز آماده کمک.",
  },
];

/* New: the page explained *what* the product does and *why* it is good, but
   never *how you start*. That is the single biggest objection on a B2B SaaS
   page, so it gets its own step-by-step block. */
const STEPS = [
  {
    icon: UserPlus,
    title: "ثبت درخواست",
    desc: "فرم تماس را پر کنید یا تلفنی مشورت بگیرید.",
  },
  {
    icon: Link2,
    title: "نصب و اتصال دستگاه",
    desc: "ردیاب توسط تیم فنی نصب و به سامانه متصل می‌شود.",
  },
  {
    icon: Gauge,
    title: "مدیریت ناوگان",
    desc: "وارد پنل شوید و از همان لحظه همه چیز را زیر نظر بگیرید.",
  },
];

const APP_FEATURES = [
  { icon: Bell, text: "هشدار آنی", desc: "اعلان لحظه‌ای" },
  { icon: MapPin, text: "آخرین موقعیت", desc: "حتی بدون اینترنت" },
  { icon: Wifi, text: "همگام‌سازی خودکار", desc: "بدون تنطیم دستی" },
  { icon: Battery, text: "مصرف بهینه باتری", desc: "کم‌مصرف در پس‌زمینه" },
];

/* Local keyframes. The original referenced `animate-float`, `bg-dotted-grid`,
   `shadow-teal` and `software-hero-radar-sweep`, none of which exist in
   tailwind.config.ts or globals.css, so all four silently did nothing.
   These are real, scoped, and reduced-motion aware. */
const PAGE_STYLES = `
@keyframes sw-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-7px); }
}
.sw-float { animation: sw-float 6s ease-in-out infinite; }
@keyframes sw-radar {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.sw-radar-sweep { animation: sw-radar 9s linear infinite; }
.sw-dotted-grid {
  background-image: radial-gradient(circle at 1px 1px, rgba(59,90,128,.20) 1px, transparent 0);
  background-size: 28px 28px;
}
/* One rhythm for the whole page. Sections used to mix the two section-padding
   utilities with a hand-rolled py-16/py-24, so no two gaps matched. One class,
   one scale, fluid between breakpoints. */
.sw-section { padding-block: clamp(3.5rem, 7vw, 6.5rem); }
/* Teal glow reserved for the one primary CTA per screen. */
.sw-teal-shadow { box-shadow: 0 10px 28px rgba(20,184,166,.28); }
.sw-teal-shadow:hover { box-shadow: 0 14px 34px rgba(20,184,166,.36); }
/* Hairline that wipes in on card hover — cheap, and it makes a static grid
   of cards feel responsive without any layout shift. */
.sw-card { position: relative; }
.sw-card::after {
  content: "";
  position: absolute;
  inset-inline: 0;
  top: 0;
  height: 2px;
  border-radius: 2px;
  background: linear-gradient(to left, #3B5A80, #14B8A6);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform .4s cubic-bezier(.16,1,.3,1);
}
.sw-card:hover::after, .sw-card:focus-within::after { transform: scaleX(1); }
.sw-step-line::before {
  content: "";
  position: absolute;
  top: 1.5rem;
  left: 0;
  right: 4.75rem;
  height: 2px;
  background: linear-gradient(to left, rgba(20,184,166,.35), rgba(20,184,166,0));
}
@media (prefers-reduced-motion: reduce) {
  .sw-float, .sw-radar-sweep { animation: none !important; }
  .sw-card::after { transition: none; }
}
`;

interface SoftwareFeatureFromApi {
  icon?: string;
  title?: string;
  desc?: string;
  image?: string | null;
}

interface SoftwarePageData {
  login_url?: string | null;
  hero_image?: string | null;
  dashboard_image?: string | null;
  dashboard_description?: string | null;
  mobile_image?: string | null;
  android_url?: string | null;
  bazaar_url?: string | null;
  features?: SoftwareFeatureFromApi[];
}

interface SettingsData {
  software_login_url?: string | null;
  software_image?: string | null;
  software_description?: string | null;
  android_app_url?: string | null;
  bazaar_app_url?: string | null;
}

export default async function SoftwarePage() {
  let settings: SettingsData | null = null;
  let swPage: SoftwarePageData | null = null;
  try {
    settings = await getSettings();
  } catch {}
  try {
    swPage = await getSoftwarePage();
  } catch {}

  const loginUrl: string =
    swPage?.login_url || settings?.software_login_url || "/contact";
  const heroImage: string | null = swPage?.hero_image || null;
  const softwareImage =
    swPage?.dashboard_image ||
    (settings?.software_image ? djangoImageUrl(settings.software_image) : null);
  const softwareDesc: string =
    swPage?.dashboard_description || settings?.software_description || "";
  const mobileImage: string | null = swPage?.mobile_image || null;

  /* Store links: render a real destination or nothing at all.
     The original shipped two `href="#"` dead buttons. */
  const androidUrl: string | null =
    swPage?.android_url || settings?.android_app_url || null;
  const bazaarUrl: string | null =
    swPage?.bazaar_url || settings?.bazaar_app_url || null;
  const hasStoreLinks = Boolean(androidUrl || bazaarUrl);

  const isExternalLogin = /^https?:\/\//.test(loginUrl);
  const loginProps = isExternalLogin
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  const apiFeatures: SoftwareFeatureFromApi[] = swPage?.features ?? [];
  const features = FEATURES.map((fallback, i) => {
    const api = apiFeatures[i];
    return {
      icon: (api?.icon && ICON_MAP[api.icon]) || fallback.icon,
      title: api?.title || fallback.title,
      desc: api?.desc || fallback.desc,
      accent: fallback.accent,
      span: fallback.span,
      image: api?.image || null,
    };
  });

  const statCards = [
    {
      value: STATS.vehicles,
      suffix: "+",
      display: null,
      label: "خودروی تحت پوشش",
      icon: MapPin,
      color: "text-accent-dark",
    },
    {
      value: STATS.companies,
      suffix: "+",
      display: null,
      label: "شرکت فعال",
      icon: Users,
      color: "text-primary",
    },
    {
      value: null,
      suffix: "",
      display: STATS.uptimeLabel,
      label: "آپتایم سامانه",
      icon: Activity,
      color: "text-accent-dark",
    },
    {
      value: null,
      suffix: "",
      display: STATS.supportLabel,
      label: "پشتیبانی فنی",
      icon: Headset,
      color: "text-primary",
    },
  ];

  /* Hero trust strip now derives from STATS instead of hardcoded literals. */
  const trustItems = [
    { icon: Shield, value: fa(STATS.vehicles), label: "خودروی فعال" },
    { icon: Users, value: `${fa(STATS.companies)}+`, label: "شرکت مشتری" },
    { icon: Activity, value: STATS.uptimeLabel, label: "آپتایم" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <style dangerouslySetInnerHTML={{ __html: PAGE_STYLES }} />

      {/* Structured data.
          NOTE: the original declared aggregateRating 4.8 / 150 with no review
          system behind it, which violates Google's structured data policy and
          risks a site-wide manual action. Still intentionally absent. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "نرم‌افزار مای فرزام",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web, Android",
            description: "سامانه آنلاین مدیریت ناوگان و ردیابی خودرو",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "IRR",
              description: `دوره آزمایشی رایگان ${fa(STATS.trialDays)} روزه`,
            },
          }),
        }}
      />

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-dark pb-14 pt-6 text-white sm:pt-8 md:pb-20 md:pt-10">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute right-1/4 top-0 h-72 w-72 rounded-full bg-white/[0.03] blur-3xl md:h-96 md:w-96" />
          <div className="absolute bottom-0 left-1/4 h-56 w-56 rounded-full bg-accent/[0.06] blur-2xl md:h-64 md:w-64" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 sm:h-[600px] sm:w-[600px] md:h-[900px] md:w-[900px]">
            <div className="absolute inset-0 rounded-full border border-white/[0.04]" />
            <div className="absolute inset-[15%] rounded-full border border-white/[0.04]" />
            <div className="absolute inset-[30%] rounded-full border border-white/[0.03]" />
            <div className="absolute inset-[45%] rounded-full border border-accent/[0.08]" />
            <div className="absolute inset-[45%] overflow-hidden rounded-full">
              <div className="sw-radar-sweep absolute inset-0">
                <div className="absolute left-1/2 top-0 h-1/2 w-1/2 origin-bottom-left bg-gradient-to-tl from-accent/15 to-transparent" />
              </div>
            </div>
          </div>
          {/* Bottom fade so the overlapping stats card lands on a soft edge
              instead of a hard navy/white seam. */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-dark to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
          <div className="text-right">
            <BreadcrumbTrail />
          </div>

          <ScrollReveal delay={0}>
            <div className="mb-5 mt-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.08] px-4 py-1.5 text-xs backdrop-blur-sm sm:text-sm">
              <Zap className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <span className="text-white/90">سامانه مدیریت هوشمند ناوگان</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            {/* The sub-line was inside the <h1>, so screen readers announced
                "نرم‌افزار مای فرزام ناوگان شما در یک نگاه" as one heading.
                It is a tagline, so it now sits outside the heading. */}
            <h1 className="font-display mb-3 text-[2.125rem] font-bold leading-[1.18] tracking-normal sm:text-5xl md:text-6xl md:leading-[1.12]">
              <span className="block text-white">نرم‌افزار مای فرزام</span>
            </h1>
            <p className="mb-4 text-lg font-semibold text-accent sm:text-xl md:text-2xl">
              ناوگان شما، در یک نگاه
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.16}>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-8 text-white/70 sm:text-lg md:text-xl md:leading-9">
              موقعیت لحظه‌ای خودروها، گزارش‌های دقیق مسیر و مصرف، و هشدار
              آنی — همه در یک پنل، بدون نصب نرم‌افزار.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.24}>
            {/* Was `flex-col sm:flex-row ... sm:flex-wrap`, which produced two
                full-width stacked buttons on mobile with equal visual weight.
                The secondary action no longer competes with the primary one. */}
            <div className="mb-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              <Button
                size="lg"
                asChild
                className="pill sw-teal-shadow w-full border-accent bg-accent px-8 text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-dark hover:bg-accent-dark sm:w-auto"
              >
                <Link href={loginUrl} {...loginProps}>
                  <Monitor className="h-5 w-5" aria-hidden="true" />
                  ورود به سامانه
                </Link>
              </Button>
              {/* Uses the new `outlineOnDark` variant. The old `variant="outline"`
                  carried `bg-white` from the cva, which nothing overrode, so
                  this rendered as a white slab with invisible white text. */}
              <Button
                size="lg"
                variant="outlineOnDark"
                asChild
                className="pill w-full sm:w-auto"
              >
                <Link href="/contact">
                  <Smartphone className="h-5 w-5" aria-hidden="true" />
                  درخواست دمو رایگان
                </Link>
              </Button>
            </div>
          </ScrollReveal>

          {/* Trust strip — values derive from STATS, separators are real CSS
              dividers rather than empty <li> elements inside a role="list". */}
          <ScrollReveal delay={0.32}>
            <ul
              role="list"
              className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-white/50 sm:text-sm md:gap-x-10"
            >
              {trustItems.map(({ icon: Icon, value, label }) => (
                <li key={label} className="flex items-center gap-2">
                  <Icon
                    className="h-4 w-4 shrink-0 text-accent/70"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="font-semibold tabular-nums text-white/85">
                      {value}
                    </span>{" "}
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Preview lives inside the hero again, on the navy surface.
              Pulling it into its own section left a dead white gap between
              the artwork and the stats card, because the illustration
              carries its own internal padding. Only the card overlaps now. */}
          <ScrollReveal delay={0.4}>
            <div className="mx-auto mt-12 max-w-3xl md:mt-16">
              {heroImage ? (
                <div className="relative aspect-[560/380] w-full">
                  <Image
                    src={heroImage}
                    alt="نمای کلی داشبورد نرم‌افزار مای فرزام"
                    fill
                    className="object-contain drop-shadow-2xl"
                    sizes="(max-width: 768px) 100vw, 768px"
                    priority
                  />
                </div>
              ) : (
                <DashboardMockup className="h-auto w-full drop-shadow-2xl" />
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Dashboard preview + stats ────────────────────────────
          The preview used to sit inside the hero and the stats bar hung off
          the bottom with a pointless `-mt-1`. Pulling both into one
          overlapping block gives the page a real focal point instead of two
          near-touching slabs. */}
      <section className="relative z-20 -mt-10 md:-mt-14">
        <div className="mx-auto max-w-5xl px-4">
          <div className="rounded-2xl border border-border-soft bg-white p-5 shadow-elevated sm:p-6 md:p-8">
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-4 md:gap-x-8">
              {statCards.map(
                ({ value, suffix, display, label, icon: Icon, color }, i) => (
                  <ScrollReveal key={label} delay={i * 0.08}>
                    <div className="text-center">
                      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-bg-muted">
                        <Icon className={`h-5 w-5 ${color}`} aria-hidden="true" />
                      </div>
                      <div className="mb-1 text-xl font-bold tabular-nums text-dark sm:text-2xl md:text-3xl">
                        {/* AnimatedCounter floors its value, so 99.9 rendered
                            as "۹۹". Non-integer stats stay static strings. */}
                        {display ?? (
                          <AnimatedCounter
                            value={value as number}
                            suffix={suffix}
                          />
                        )}
                      </div>
                      <div className="text-xs text-text-muted md:text-sm">
                        {label}
                      </div>
                    </div>
                  </ScrollReveal>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────── */}
      <section
        id="features"
        className="sw-section scroll-mt-24"
      >
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle
            eyebrow="امکانات"
            title="امکانات سامانه"
            subtitle="تمام ابزارهای لازم برای مدیریت حرفه‌ای ناوگان"
            centered
            className="mb-10 md:mb-14"
          />
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {features.map(
              ({ icon: Icon, title, desc, accent, span, image }, i) => (
                <ScrollReveal key={title} delay={i * 0.08} className={`h-full ${span}`}>
                  <div className="sw-card group flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-border-soft bg-white p-5 transition-shadow duration-300 hover:shadow-elevated md:p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`h-12 w-12 shrink-0 overflow-hidden rounded-xl ${accent} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                      >
                        {image ? (
                          <Image
                            src={image}
                            alt=""
                            width={48}
                            height={48}
                            className="h-full w-full object-contain p-1.5"
                            loading="lazy"
                          />
                        ) : (
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="mb-1.5 text-base font-semibold text-dark">
                          {title}
                        </h3>
                        <p className="text-sm leading-7 text-text-secondary">
                          {desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────
          New. The page described the product and its advantages but never
          answered "how do I actually start", which is the main drop-off point. */}
      <section className="sw-section relative overflow-hidden bg-bg-soft">
        <div
          className="sw-dotted-grid pointer-events-none absolute inset-0 opacity-40"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <SectionTitle
            eyebrow="شروع کار"
            title="در سه قدم راه‌اندازی کنید"
            subtitle="از تماس تا مدیریت ناوگان، کمتر از یک روز کاری"
            centered
            className="mb-10 md:mb-14"
          />
          <ol
            role="list"
            className="mx-auto grid max-w-4xl grid-cols-1 gap-9 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-0"
          >
            {STEPS.map(({ icon: Icon, title, desc }, i) => (
              <ScrollReveal key={title} delay={i * 0.1}>
                <li className="relative text-center sm:text-right">
                  {/* connector, drawn only between steps on wide screens */}
                  {i < STEPS.length - 1 && (
                    <span
                      className="sw-step-line pointer-events-none absolute inset-0 hidden sm:block"
                      aria-hidden="true"
                    />
                  )}
                  <div className="relative mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/20 bg-white text-accent-dark shadow-soft sm:mx-0">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    <span className="absolute -left-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold tabular-nums text-white">
                      {fa(i + 1)}
                    </span>
                  </div>
                  <h3 className="mb-1.5 text-base font-semibold text-dark">
                    {title}
                  </h3>
                  <p className="text-sm leading-7 text-text-secondary">{desc}</p>
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Dashboard showcase ────────────────────────────── */}
      <section className="sw-section">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle
            eyebrow="داشبورد"
            title="داشبورد مدیریت ناوگان"
            subtitle="مشاهده لحظه‌ای موقعیت، مسیر و وضعیت خودروها"
            centered
            className="mb-10 md:mb-14"
          />
          <ScrollReveal>
            {/* px-2 md:px-0 gives the outset badges room so they are not
                clipped on small screens. */}
            <div className="relative mx-auto max-w-4xl px-2 md:px-0">
              <div
                className="absolute -inset-4 rounded-3xl bg-accent/[0.05] blur-2xl"
                aria-hidden="true"
              />
              {softwareImage ? (
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border-base shadow-elevated">
                  <Image
                    src={softwareImage}
                    alt="داشبورد مدیریت ناوگان مای فرزام"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 80vw"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="relative aspect-[560/380] overflow-hidden rounded-2xl border border-border-base bg-navy-deeper p-4 shadow-elevated md:p-6">
                  <DashboardMockup className="h-full w-full" />
                </div>
              )}

              {/* Floating badges are decorative context, so they are hidden on
                  the smallest screens where they overlapped the mockup UI. */}
              <div className="sw-float absolute -top-4 right-2 z-10 hidden items-center gap-2.5 rounded-xl border border-border-soft bg-white p-3 shadow-elevated sm:flex md:-right-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-success-light">
                  <Activity className="h-4 w-4 text-accent-dark" aria-hidden="true" />
                </div>
                <div className="text-right">
                  <div className="text-[10px] leading-none text-text-muted">
                    آپتایم
                  </div>
                  <div className="text-sm font-bold leading-tight tabular-nums text-accent-dark">
                    {STATS.uptimeLabel}
                  </div>
                </div>
              </div>

              <div
                className="sw-float absolute -bottom-4 left-2 z-10 hidden items-center gap-2.5 rounded-xl border border-border-soft bg-white p-3 shadow-elevated sm:flex md:-left-4"
                style={{ animationDelay: "1.5s" }}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-info-light">
                  <BarChart3 className="h-4 w-4 text-primary" aria-hidden="true" />
                </div>
                <div className="text-right">
                  <div className="text-[10px] leading-none text-text-muted">
                    گزارش‌ها
                  </div>
                  <div className="text-sm font-bold leading-tight tabular-nums text-primary">
                    +۱۲۰
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
          {softwareDesc && (
            <p className="mx-auto mt-8 max-w-2xl text-center leading-8 text-text-secondary">
              {softwareDesc}
            </p>
          )}
        </div>
      </section>

      {/* ── Mobile app ─────────────────────────────────── */}
      <section className="sw-section bg-bg-soft">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-14 md:flex-row md:gap-16">
            <ScrollReveal className="shrink-0">
              {mobileImage ? (
                <div className="relative h-[440px] w-[220px] sm:h-[520px] sm:w-[260px]">
                  <Image
                    src={mobileImage}
                    alt="اپلیکیشن موبایل مای فرزام"
                    fill
                    className="object-contain drop-shadow-2xl"
                    sizes="(max-width: 640px) 220px, 260px"
                    loading="lazy"
                  />
                  <div
                    className="absolute -bottom-10 left-1/2 h-16 w-48 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
                    aria-hidden="true"
                  />
                </div>
              ) : (
                <div className="relative h-[440px] w-[220px]" aria-hidden="true">
                  <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-[36px] bg-primary/5 blur-md" />
                  <div className="absolute inset-0 overflow-hidden rounded-[36px] border-[3px] border-primary/15 bg-navy-deeper shadow-elevated">
                    <div className="flex h-10 items-center justify-between bg-dark px-6 pt-2">
                      <span className="text-[10px] tabular-nums text-white/50">
                        ۱۲:۳۰
                      </span>
                      <div className="flex gap-1.5">
                        <Wifi className="h-3 w-3 text-white/40" />
                        <Battery className="h-3 w-3 text-white/40" />
                      </div>
                    </div>
                    <div className="px-4 pb-2 pt-3">
                      <div className="mb-3 flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/20">
                          <MapPin className="h-3.5 w-3.5 text-accent" />
                        </div>
                        <span className="text-[11px] font-medium text-white/70">
                          مای فرزام
                        </span>
                      </div>

                      {/* The route polyline used to be a bare <path> with no
                          <svg> parent, so React rendered it in the HTML
                          namespace and it was invisible. Now wrapped. */}
                      <div className="relative h-[160px] w-full overflow-hidden rounded-xl bg-dark/80">
                        <svg
                          viewBox="0 0 190 160"
                          className="absolute inset-0 h-full w-full"
                          aria-hidden="true"
                        >
                          <g stroke="rgba(255,255,255,.12)" strokeWidth="1">
                            <line x1="0" y1="40" x2="190" y2="40" />
                            <line x1="0" y1="80" x2="190" y2="80" />
                            <line x1="0" y1="120" x2="190" y2="120" />
                            <line x1="40" y1="0" x2="40" y2="160" />
                            <line x1="80" y1="0" x2="80" y2="160" />
                            <line x1="120" y1="0" x2="120" y2="160" />
                          </g>
                          <path
                            d="M30 130 Q60 90 90 100 T150 60"
                            stroke="#14B8A6"
                            strokeWidth="2.5"
                            fill="none"
                            strokeLinecap="round"
                          />
                          <circle cx="30" cy="130" r="4.5" fill="#14B8A6" />
                          <circle cx="90" cy="100" r="4.5" fill="#14B8A6" />
                          <circle cx="150" cy="60" r="5.5" fill="#14B8A6" />
                          <circle
                            cx="150"
                            cy="60"
                            r="10"
                            fill="none"
                            stroke="#14B8A6"
                            strokeOpacity=".35"
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-1 space-y-2 px-4">
                      <div className="flex items-center gap-2.5 rounded-lg bg-white/5 p-2.5">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent/15">
                          <Zap className="h-3.5 w-3.5 text-accent" />
                        </div>
                        <div>
                          <div className="text-[9px] text-white/40">وضعیت</div>
                          <div className="text-[11px] font-medium text-white/80">
                            فعال — ۳ خودرو
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5 rounded-lg bg-white/5 p-2.5">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-warning/15">
                          <Bell className="h-3.5 w-3.5 text-warning" />
                        </div>
                        <div>
                          <div className="text-[9px] text-white/40">هشدارها</div>
                          <div className="text-[11px] font-medium text-white/80">
                            ۲ هشدار جدید
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 flex h-12 items-center justify-around border-t border-white/5 bg-dark/90 px-4">
                      {[MapPin, BarChart3, Bell, Smartphone].map((Icon, i) => (
                        <div
                          key={i}
                          className={`flex h-8 w-8 items-center justify-center rounded-lg ${i === 0 ? "bg-accent/15" : ""}`}
                        >
                          <Icon
                            className={`h-4 w-4 ${i === 0 ? "text-accent" : "text-white/30"}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute -bottom-8 left-1/2 h-12 w-40 -translate-x-1/2 rounded-full bg-accent/10 blur-2xl" />
                </div>
              )}
            </ScrollReveal>

            <div className="flex-1 text-center md:text-right">
              <ScrollReveal>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent-dark">
                  <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>اپلیکیشن موبایل</span>
                </div>
                <h2 className="font-display mb-3 text-2xl font-bold leading-tight text-dark md:text-3xl">
                  مدیریت ناوگان در جیب شما
                </h2>
                <p className="mx-auto mb-6 max-w-md leading-8 text-text-secondary md:mx-0">
                  با اپلیکیشن موبایل مای فرزام، ناوگان خود را از هر کجا مدیریت
                  کنید. هشدارهای آنی، ردیابی لحظه‌ای و گزارش‌گیری مستقیم از
                  گوشی.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <ul
                  role="list"
                  className="mx-auto mb-8 grid max-w-sm grid-cols-1 gap-x-5 gap-y-5 text-right sm:grid-cols-2 md:mx-0"
                >
                  {APP_FEATURES.map(({ icon: Icon, text, desc }) => (
                    <li key={text} className="flex items-start gap-3 text-sm">
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                        <Icon
                          className="h-4 w-4 text-accent-dark"
                          aria-hidden="true"
                        />
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-dark">
                          {text}
                        </span>
                        <span className="mt-0.5 block text-xs text-text-muted">
                          {desc}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                {hasStoreLinks ? (
                  <div className="flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap md:justify-start">
                    {androidUrl && (
                      <Button
                        size="lg"
                        asChild
                        className="pill w-full gap-2 border-dark bg-dark px-6 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-navy-deeper hover:bg-navy-deeper sm:w-auto"
                      >
                        <a
                          href={androidUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="دانلود اپلیکیشن اندروید"
                        >
                          <Download className="h-5 w-5" aria-hidden="true" />
                          <span className="text-right text-xs leading-tight">
                            <span className="block text-white/60">دانلود مستقیم</span>
                            <span className="block font-bold">نسخه اندروید</span>
                          </span>
                        </a>
                      </Button>
                    )}
                    {bazaarUrl && (
                      <Button
                        size="lg"
                        variant="outline"
                        asChild
                        className="pill w-full gap-2 px-6 font-semibold sm:w-auto"
                      >
                        <a
                          href={bazaarUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="دانلود از کافه بازار"
                        >
                          <Download className="h-5 w-5" aria-hidden="true" />
                          <span className="text-right text-xs leading-tight">
                            <span className="block text-text-muted">دانلود از</span>
                            <span className="block font-bold text-dark">بازار</span>
                          </span>
                        </a>
                      </Button>
                    )}
                  </div>
                ) : (
                  /* No store URL configured yet — a real destination beats a
                     dead href="#" button. */
                  <div className="flex justify-center md:justify-start">
                    <Button
                      size="lg"
                      asChild
                      className="pill w-full gap-2 border-dark bg-dark px-6 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-navy-deeper hover:bg-navy-deeper sm:w-auto"
                    >
                      <Link href="/contact">
                        <Download className="h-5 w-5" aria-hidden="true" />
                        دریافت لینک اپلیکیشن
                      </Link>
                    </Button>
                  </div>
                )}
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ───────────────────────────────────── */}
      <section className="sw-section">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle
            eyebrow="مزایا"
            title="چرا مای فرزام؟"
            subtitle="تجربه‌ای متفاوت از مدیریت ناوگان"
            centered
            className="mb-10 md:mb-14"
          />
          <ul
            role="list"
            className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4"
          >
            {BENEFITS.map(({ icon: Icon, title, desc }, i) => (
              <ScrollReveal key={title} delay={i * 0.08} className="h-full">
                <li className="sw-card group h-full overflow-hidden rounded-2xl border border-border-soft bg-white p-5 text-right transition-shadow duration-300 hover:shadow-elevated">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent-dark transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mb-1.5 text-base font-semibold text-dark">
                    {title}
                  </h3>
                  <p className="text-sm leading-7 text-text-secondary">{desc}</p>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section className="sw-section bg-bg-soft">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle
            eyebrow="پرسش و پاسخ"
            title="سوالات متداول"
            subtitle="پاسخ سوالات رایج درباره نرم‌افزار مای فرزام"
            centered
            className="mb-10 md:mb-14"
          />
          <ScrollReveal>
            <SoftwareFAQ />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="mt-10 text-center md:mt-12">
              <p className="mb-3 text-sm text-text-muted">
                پاسخ سوال خود را پیدا نکردید؟
              </p>
              <Button variant="outline" asChild className="pill">
                <Link href="/contact">
                  <MessageSquare className="h-4 w-4" aria-hidden="true" />
                  تماس با پشتیبانی
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────
          Moved onto the dark brand surface. Two adjacent light-grey sections
          (FAQ then CTA) made the page fade out at exactly the point where it
          should close hardest. */}
      <section className="sw-section relative overflow-hidden bg-dark">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>
        <div className="relative z-10 mx-auto max-w-2xl px-4 text-center">
          <ScrollReveal>
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10">
              <Monitor className="h-7 w-7 text-accent" aria-hidden="true" />
            </div>
            <h2 className="font-display mb-3 text-2xl font-bold text-white md:text-3xl">
              آماده شروع هستید؟
            </h2>
            <p className="mx-auto mb-5 max-w-md leading-8 text-white/70">
              همین حالا وارد سامانه شوید و ناوگان خود را هوشمند مدیریت کنید.
            </p>
            <div className="mb-7 inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              <Zap className="h-3 w-3" aria-hidden="true" />
              <span>{fa(STATS.trialDays)} روز رایگان امتحان کنید</span>
            </div>
            <div className="mb-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              <Button
                size="lg"
                asChild
                className="pill sw-teal-shadow w-full border-accent bg-accent px-8 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-dark hover:bg-accent-dark sm:w-auto"
              >
                <Link href={loginUrl} {...loginProps}>
                  <Monitor className="h-5 w-5" aria-hidden="true" />
                  ورود به سامانه
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outlineOnDark"
                asChild
                className="pill w-full sm:w-auto"
              >
                <Link href="/contact">درخواست دمو</Link>
              </Button>
            </div>
            <ul
              role="list"
              className="flex flex-col items-center justify-center gap-2 text-xs text-white/50 sm:flex-row sm:gap-5"
            >
              <li className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-accent/70" aria-hidden="true" />
                بدون نیاز به کارت اعتباری
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-accent/70" aria-hidden="true" />
                فعال‌سازی آنی
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-accent/70" aria-hidden="true" />
                لغو در هر زمان
              </li>
            </ul>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
