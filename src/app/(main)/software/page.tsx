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

/* ──────────────────────────────────────────────────────────────
   SINGLE SOURCE OF TRUTH for the numbers shown on this page.
   The hero trust strip and the stats bar used to disagree
   ("+۱۰۰ شرکت" vs "۵۰۰+ شرکت"). Both now read from here.
   ────────────────────────────────────────────────────────────── */
const STATS = {
  vehicles: 10000,
  companies: 500,
  uptimeLabel: "۹۹.۹٪",
  supportLabel: "۲۴/۷",
} as const;

const FEATURES = [
  {
    icon: MapPin,
    title: "ردیابی لحظه‌ای",
    desc: "مشاهده موقعیت دقیق خودروها روی نقشه با به‌روزرسانی هر ۱۰ ثانیه.",
    accent: "bg-accent/10 text-accent",
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

const BENEFITS = [
  {
    icon: Rocket,
    title: "راه‌اندازی سریع",
    desc: "فعال‌سازی در کمتر از ۵ دقیقه بدون نیاز به دانش فنی.",
    accent: "bg-accent/10 text-accent",
    num: "۰۱",
  },
  {
    icon: Cloud,
    title: "بدون نصب",
    desc: "دسترسی کامل از طریق مرورگر، بدون نرم‌افزار جانبی.",
    accent: "bg-primary/10 text-primary",
    num: "۰۲",
  },
  {
    icon: Clock,
    title: "به‌روزرسانی لحظه‌ای",
    desc: "موقعیت خودروها با فاصله کمتر از ۱۰ ثانیه.",
    accent: "bg-warning/10 text-warning",
    num: "۰۳",
  },
  {
    icon: Headphones,
    title: "پشتیبانی ۲۴/۷",
    desc: "تیم پشتیبانی ما در تمام ساعات شبانه‌روز آماده کمک.",
    accent: "bg-error/10 text-error",
    num: "۰۴",
  },
];

const APP_FEATURES = [
  { icon: Bell, text: "هشدار آنی", desc: "اعلان لحظه‌ای" },
  { icon: MapPin, text: "آخرین موقعیت", desc: "حتی بدون اینترنت" },
  { icon: Wifi, text: "همگام‌سازی خودکار", desc: "بدون تنظیم دستی" },
  { icon: Battery, text: "مصرف بهینه باتری", desc: "کم‌مصرف در پس‌زمینه" },
];

/* Local keyframes. The previous version referenced `animate-float`,
   `bg-dotted-grid`, `shadow-teal` and `software-hero-radar-sweep`, none of
   which exist in tailwind.config.ts or globals.css, so all four silently
   did nothing. These are real, scoped, and reduced-motion aware. */
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
.sw-teal-shadow { box-shadow: 0 10px 28px rgba(20,184,166,.28); }
.sw-teal-shadow:hover { box-shadow: 0 14px 34px rgba(20,184,166,.36); }
@media (prefers-reduced-motion: reduce) {
  .sw-float, .sw-radar-sweep { animation: none !important; }
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
     The previous version shipped two `href="#"` dead buttons. */
  const androidUrl: string | null =
    swPage?.android_url || settings?.android_app_url || null;
  const bazaarUrl: string | null =
    swPage?.bazaar_url || settings?.bazaar_app_url || null;
  const hasStoreLinks = Boolean(androidUrl || bazaarUrl);

  const isExternalLogin = /^https?:\/\//.test(loginUrl);

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
      color: "text-accent",
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
      color: "text-accent",
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

  return (
    <div className="bg-white min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: PAGE_STYLES }} />

      {/* Structured data.
          NOTE: the previous version declared aggregateRating 4.8 / 150 with no
          review system behind it, which violates Google's structured data
          policy and risks a site-wide manual action. Removed until real,
          countable reviews exist. */}
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
              description: "دوره آزمایشی رایگان ۱۴ روزه",
            },
          }),
        }}
      />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="text-white pt-6 pb-14 sm:pt-8 md:pt-10 md:pb-24 relative overflow-hidden bg-dark">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-0 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-white/[0.03] rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-56 h-56 md:w-64 md:h-64 bg-accent/[0.06] rounded-full blur-2xl" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] sm:w-[600px] sm:h-[600px] md:w-[900px] md:h-[900px]">
            <div className="absolute inset-0 rounded-full border border-white/[0.04]" />
            <div className="absolute inset-[15%] rounded-full border border-white/[0.04]" />
            <div className="absolute inset-[30%] rounded-full border border-white/[0.03]" />
            <div className="absolute inset-[45%] rounded-full border border-accent/[0.08]" />
            <div className="absolute inset-[45%] rounded-full overflow-hidden">
              <div className="sw-radar-sweep absolute inset-0">
                <div className="absolute top-0 left-1/2 w-1/2 h-1/2 origin-bottom-left bg-gradient-to-tl from-accent/15 to-transparent" />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="text-right">
            <BreadcrumbTrail />
          </div>

          <ScrollReveal delay={0}>
            <div className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-sm rounded-full px-4 py-1.5 text-xs sm:text-sm mt-6 mb-5 border border-white/[0.06]">
              <Zap
                className="w-4 h-4 text-accent shrink-0"
                aria-hidden="true"
              />
              <span className="text-white/90">سامانه مدیریت هوشمند ناوگان</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <h1 className="text-[2rem] leading-[1.2] sm:text-4xl md:text-6xl md:leading-[1.15] font-bold mb-4 tracking-normal">
              <span className="block text-white/95">نرم‌افزار مای فرزام</span>
              <span className="mt-2 block text-xl font-semibold text-accent sm:text-2xl md:text-3xl">
                ناوگان شما، در یک نگاه
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.16}>
            <p className="text-white/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-8">
              مدیریت هوشمند ناوگان خودرویی با امکانات پیشرفته ردیابی، گزارش‌گیری
              و هشدار آنی
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.24}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center sm:flex-wrap mb-10">
              <Button
                size="lg"
                asChild
                className="w-full sm:w-auto px-8 pill bg-accent hover:bg-accent-dark text-white sw-teal-shadow hover:-translate-y-0.5 transition-all duration-200"
              >
                <Link
                  href={loginUrl}
                  {...(isExternalLogin
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <Monitor className="w-5 h-5 ml-2" aria-hidden="true" /> ورود
                  به سامانه
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="w-full sm:w-auto border-white/20 text-white hover:bg-white/[0.08] hover:border-white/30 pill backdrop-blur-sm transition-all duration-200"
              >
                <Link href="/contact">
                  <Smartphone className="w-5 h-5 ml-2" aria-hidden="true" />{" "}
                  درخواست دمو رایگان
                </Link>
              </Button>
            </div>
          </ScrollReveal>

          {/* Trust strip — now consistent with the stats bar below */}
          <ScrollReveal delay={0.32}>
            <ul
              role="list"
              className="flex items-center justify-center gap-x-6 gap-y-3 md:gap-10 flex-wrap text-xs sm:text-sm text-white/50"
            >
              <li className="flex items-center gap-2">
                <Shield
                  className="w-4 h-4 text-accent/60 shrink-0"
                  aria-hidden="true"
                />
                <span>
                  بیش از{" "}
                  <span className="text-white/80 font-semibold tabular-nums">
                    ۱۰٬۰۰۰
                  </span>{" "}
                  خودرو
                </span>
              </li>
              <li
                className="w-px h-4 bg-white/10 hidden md:block"
                aria-hidden="true"
              />
              <li className="flex items-center gap-2">
                <Users
                  className="w-4 h-4 text-accent/60 shrink-0"
                  aria-hidden="true"
                />
                <span>
                  <span className="text-white/80 font-semibold tabular-nums">
                    ۵۰۰+
                  </span>{" "}
                  شرکت فعال
                </span>
              </li>
              <li
                className="w-px h-4 bg-white/10 hidden md:block"
                aria-hidden="true"
              />
              <li className="flex items-center gap-2">
                <Activity
                  className="w-4 h-4 text-accent/60 shrink-0"
                  aria-hidden="true"
                />
                <span>
                  <span className="text-white/80 font-semibold tabular-nums">
                    {STATS.uptimeLabel}
                  </span>{" "}
                  آپتایم
                </span>
              </li>
            </ul>
          </ScrollReveal>

          {/* Dashboard preview — this is the page LCP element */}
          <ScrollReveal delay={0.4} className="mt-10 md:mt-16">
            <div className="max-w-3xl mx-auto">
              {heroImage ? (
                <div className="relative w-full aspect-[560/380]">
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
                <DashboardMockup className="w-full h-auto drop-shadow-2xl" />
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Stats bar ──────────────────────────────────────── */}
      <section className="relative -mt-1 z-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-elevated border border-border-soft p-5 sm:p-6 md:p-8 hover-glow">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 md:gap-8">
              {statCards.map(
                ({ value, suffix, display, label, icon: Icon, color }, i) => (
                  <ScrollReveal key={label} delay={i * 0.1}>
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-xl bg-bg-muted flex items-center justify-center mx-auto mb-3">
                        <Icon
                          className={`w-5 h-5 ${color}`}
                          aria-hidden="true"
                        />
                      </div>
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-dark mb-1 tabular-nums">
                        {/* AnimatedCounter floors its value, so 99.9 rendered as
                          "۹۹". Non-integer stats are static strings now. */}
                        {display ?? (
                          <AnimatedCounter
                            value={value as number}
                            suffix={suffix}
                          />
                        )}
                      </div>
                      <div className="text-xs md:text-sm text-text-muted">
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

      {/* ── Features ───────────────────────────────────────── */}
      <section className="py-section-mobile md:py-section-desktop">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle
            eyebrow="امکانات"
            title="امکانات سامانه"
            subtitle="تمام ابزارهای لازم برای مدیریت حرفه‌ای ناوگان"
            centered
          />
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map(
              ({ icon: Icon, title, desc, accent, span, image }, i) => (
                <ScrollReveal key={title} delay={i * 0.08} className={span}>
                  <div className="group rounded-2xl border border-border-soft bg-white p-5 md:p-6 flex flex-col gap-4 card-hover hover-glow h-full">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl ${accent} flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110 overflow-hidden`}
                      >
                        {image ? (
                          <Image
                            src={image}
                            alt=""
                            width={48}
                            height={48}
                            className="w-full h-full object-contain p-1.5"
                            loading="lazy"
                          />
                        ) : (
                          <Icon className="w-5 h-5" aria-hidden="true" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-dark text-base mb-1.5">
                          {title}
                        </h3>
                        <p className="text-sm text-text-secondary leading-7">
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

      {/* ── Dashboard showcase ─────────────────────────────── */}
      <section className="py-section-mobile md:py-section-desktop bg-bg-soft relative overflow-hidden">
        <div
          className="sw-dotted-grid absolute inset-0 opacity-40 pointer-events-none"
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <SectionTitle
            eyebrow="داشبورد"
            title="داشبورد مدیریت ناوگان"
            subtitle="مشاهده لحظه‌ای موقعیت، مسیر و وضعیت خودروها"
            centered
          />
          <ScrollReveal>
            {/* px-2 md:px-0 gives the outset badges room so they are not
                clipped by the section's overflow-hidden on small screens. */}
            <div className="max-w-4xl mx-auto relative px-2 md:px-0">
              <div
                className="absolute -inset-4 bg-accent/[0.05] rounded-3xl blur-2xl"
                aria-hidden="true"
              />
              {softwareImage ? (
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-border-base shadow-elevated hover-lift">
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
                <div className="relative aspect-[560/380] rounded-2xl overflow-hidden border border-border-base shadow-elevated bg-navy-deeper p-4 md:p-6 hover-lift">
                  <DashboardMockup className="w-full h-full" />
                </div>
              )}

              <div className="sw-float absolute top-2 right-2 md:-top-4 md:-right-4 bg-white rounded-xl shadow-elevated p-2.5 md:p-3 flex items-center gap-2.5 border border-border-soft z-10">
                <div className="w-8 h-8 rounded-lg bg-success-light flex items-center justify-center shrink-0">
                  <Activity
                    className="w-4 h-4 text-accent"
                    aria-hidden="true"
                  />
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-text-muted leading-none">
                    آپتایم
                  </div>
                  <div className="text-sm font-bold text-accent leading-tight tabular-nums">
                    {STATS.uptimeLabel}
                  </div>
                </div>
              </div>

              <div
                className="sw-float absolute bottom-2 left-2 md:-bottom-4 md:-left-4 bg-white rounded-xl shadow-elevated p-2.5 md:p-3 flex items-center gap-2.5 border border-border-soft z-10"
                style={{ animationDelay: "1.5s" }}
              >
                <div className="w-8 h-8 rounded-lg bg-info-light flex items-center justify-center shrink-0">
                  <BarChart3
                    className="w-4 h-4 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-text-muted leading-none">
                    گزارش‌ها
                  </div>
                  <div className="text-sm font-bold text-primary leading-tight tabular-nums">
                    +۱۲۰
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
          {softwareDesc && (
            <p className="text-center text-text-secondary mt-8 max-w-2xl mx-auto leading-8">
              {softwareDesc}
            </p>
          )}
        </div>
      </section>

      {/* ── Mobile app ─────────────────────────────────────── */}
      <section className="py-section-mobile md:py-section-desktop">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <ScrollReveal className="shrink-0">
              {mobileImage ? (
                <div className="relative w-[220px] h-[440px] sm:w-[260px] sm:h-[520px]">
                  <Image
                    src={mobileImage}
                    alt="اپلیکیشن موبایل مای فرزام"
                    fill
                    className="object-contain drop-shadow-2xl"
                    sizes="(max-width: 640px) 220px, 260px"
                    loading="lazy"
                  />
                  <div
                    className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-16 bg-accent/10 rounded-full blur-3xl"
                    aria-hidden="true"
                  />
                </div>
              ) : (
                <div
                  className="relative w-[220px] h-[440px]"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 rounded-[36px] bg-primary/5 translate-x-2 translate-y-2 blur-md" />
                  <div className="absolute inset-0 rounded-[36px] bg-navy-deeper border-[3px] border-primary/15 shadow-elevated overflow-hidden">
                    <div className="h-10 bg-dark flex items-center justify-between px-6 pt-2">
                      <span className="text-[10px] text-white/50 tabular-nums">
                        ۱۲:۳۰
                      </span>
                      <div className="flex gap-1.5">
                        <Wifi className="w-3 h-3 text-white/40" />
                        <Battery className="w-3 h-3 text-white/40" />
                      </div>
                    </div>
                    <div className="px-4 pt-3 pb-2">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-md bg-accent/20 flex items-center justify-center">
                          <MapPin className="w-3.5 h-3.5 text-accent" />
                        </div>
                        <span className="text-[11px] text-white/70 font-medium">
                          مای فرزام
                        </span>
                      </div>

                      {/* The route polyline used to be a bare <path> with no
                          <svg> parent, so React rendered it in the HTML
                          namespace and it was invisible. Now wrapped. */}
                      <div className="w-full h-[160px] rounded-xl bg-dark/80 relative overflow-hidden">
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
                    <div className="px-4 space-y-2 mt-1">
                      <div className="bg-white/5 rounded-lg p-2.5 flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-md bg-accent/15 flex items-center justify-center shrink-0">
                          <Zap className="w-3.5 h-3.5 text-accent" />
                        </div>
                        <div>
                          <div className="text-[9px] text-white/40">وضعیت</div>
                          <div className="text-[11px] text-white/80 font-medium">
                            فعال — ۳ خودرو
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2.5 flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-md bg-warning/15 flex items-center justify-center shrink-0">
                          <Bell className="w-3.5 h-3.5 text-warning" />
                        </div>
                        <div>
                          <div className="text-[9px] text-white/40">
                            هشدارها
                          </div>
                          <div className="text-[11px] text-white/80 font-medium">
                            ۲ هشدار جدید
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 h-12 bg-dark/90 border-t border-white/5 flex items-center justify-around px-4">
                      {[MapPin, BarChart3, Bell, Smartphone].map((Icon, i) => (
                        <div
                          key={i}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${i === 0 ? "bg-accent/15" : ""}`}
                        >
                          <Icon
                            className={`w-4 h-4 ${i === 0 ? "text-accent" : "text-white/30"}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-40 h-12 bg-accent/10 rounded-full blur-2xl" />
                </div>
              )}
            </ScrollReveal>

            <div className="flex-1 text-center md:text-right">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 bg-accent/10 rounded-full px-3 py-1 text-xs font-semibold text-accent-dark mb-4">
                  <Smartphone className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>اپلیکیشن موبایل</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-dark mb-3 leading-tight">
                  مدیریت ناوگان در جیب شما
                </h2>
                <p className="text-text-secondary leading-8 mb-6 max-w-md mx-auto md:mx-0">
                  با اپلیکیشن موبایل مای فرزام، ناوگان خود را از هر کجا مدیریت
                  کنید. هشدارهای آنی، ردیابی لحظه‌ای و گزارش‌گیری مستقیم از
                  گوشی.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <ul
                  role="list"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 mb-7 max-w-sm mx-auto md:mx-0 text-right"
                >
                  {APP_FEATURES.map(({ icon: Icon, text, desc }) => (
                    <li key={text} className="flex items-start gap-3 text-sm">
                      <span className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon
                          className="w-4 h-4 text-accent-dark"
                          aria-hidden="true"
                        />
                      </span>
                      <span>
                        <span className="block font-medium text-dark text-sm">
                          {text}
                        </span>
                        <span className="block text-xs text-text-muted mt-0.5">
                          {desc}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                {hasStoreLinks ? (
                  <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start sm:flex-wrap">
                    {androidUrl && (
                      <Button
                        size="lg"
                        asChild
                        className="w-full sm:w-auto bg-dark hover:bg-navy-deeper text-white font-semibold px-6 pill gap-2 hover:-translate-y-0.5 transition-all duration-200"
                      >
                        <a
                          href={androidUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="دانلود اپلیکیشن اندروید"
                        >
                          <Download className="w-5 h-5" aria-hidden="true" />
                          <span className="text-xs leading-tight text-right">
                            <span className="block text-white/60">
                              دانلود مستقیم
                            </span>
                            <span className="block font-bold">
                              نسخه اندروید
                            </span>
                          </span>
                        </a>
                      </Button>
                    )}
                    {bazaarUrl && (
                      <Button
                        size="lg"
                        asChild
                        className="w-full sm:w-auto bg-dark hover:bg-navy-deeper text-white font-semibold px-6 pill gap-2 hover:-translate-y-0.5 transition-all duration-200"
                      >
                        <a
                          href={bazaarUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="دانلود از کافه بازار"
                        >
                          <Download className="w-5 h-5" aria-hidden="true" />
                          <span className="text-xs leading-tight text-right">
                            <span className="block text-white/60">
                              دانلود از
                            </span>
                            <span className="block font-bold">بازار</span>
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
                      className="w-full sm:w-auto bg-dark hover:bg-navy-deeper text-white font-semibold px-6 pill gap-2 hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <Link href="/contact">
                        <Download className="w-5 h-5" aria-hidden="true" />
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

      {/* ── Benefits ───────────────────────────────────────── */}
      <section className="py-section-mobile md:py-section-desktop">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle
            eyebrow="مزایا"
            title="مزایای استفاده از سامانه"
            subtitle="تجربه‌ای متفاوت از مدیریت ناوگان"
            centered
          />
          <div className="max-w-3xl mx-auto space-y-4">
            {BENEFITS.map(({ icon: Icon, title, desc, accent, num }, i) => (
              <ScrollReveal key={title} delay={i * 0.1}>
                <div className="group rounded-2xl border border-border-soft bg-white p-5 md:p-6 flex items-start gap-4 sm:gap-5 card-hover hover-glow relative overflow-hidden">
                  <span
                    className="absolute top-4 left-4 text-xs font-bold text-text-muted/30 tabular-nums"
                    aria-hidden="true"
                  >
                    {num}
                  </span>
                  <div
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${accent} flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105`}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0 pl-8 sm:pl-0">
                    <h3 className="font-semibold text-dark text-base mb-1.5">
                      {title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-7">
                      {desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section className="py-section-mobile md:py-section-desktop">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle
            eyebrow="پرسش و پاسخ"
            title="سوالات متداول"
            subtitle="پاسخ سوالات رایج درباره نرم‌افزار مای فرزام"
            centered
          />
          <ScrollReveal>
            <SoftwareFAQ />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="text-center mt-8">
              <p className="text-sm text-text-muted mb-3">
                پاسخ سوال خود را پیدا نکردید؟
              </p>
              <Button
                variant="outline"
                asChild
                className="border-primary/20 text-primary hover:bg-primary/5 pill"
              >
                <Link href="/contact">
                  <MessageSquare className="w-4 h-4 ml-2" aria-hidden="true" />{" "}
                  تماس با پشتیبانی
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────── */}
      <section className="py-section-mobile md:py-section-desktop bg-bg-soft relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/[0.04] rounded-full blur-3xl" />
        </div>
        <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <div className="relative rounded-2xl p-[1px] bg-gradient-to-bl from-accent/30 via-primary/10 to-accent/30">
              <div className="bg-white rounded-[15px] p-6 sm:p-8 md:p-10">
                <div className="w-14 h-14 rounded-2xl bg-accent-light flex items-center justify-center mx-auto mb-5">
                  <Monitor
                    className="w-7 h-7 text-accent-dark"
                    aria-hidden="true"
                  />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-dark mb-3">
                  آماده شروع هستید؟
                </h2>
                <p className="text-text-secondary mb-4 max-w-md mx-auto leading-8">
                  همین حالا وارد سامانه شوید و ناوگان خود را هوشمند مدیریت کنید.
                </p>
                <div className="inline-flex items-center gap-1.5 bg-accent/10 rounded-full px-3 py-1 text-xs text-accent-dark font-medium mb-6">
                  <Zap className="w-3 h-3" aria-hidden="true" />
                  <span>۱۴ روز رایگان امتحان کنید</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center sm:flex-wrap mb-5">
                  <Button
                    size="lg"
                    asChild
                    className="w-full sm:w-auto font-semibold px-8 pill bg-accent hover:bg-accent-dark text-white sw-teal-shadow hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <Link
                      href={loginUrl}
                      {...(isExternalLogin
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      <Monitor className="w-5 h-5 ml-2" aria-hidden="true" />{" "}
                      ورود به سامانه
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="w-full sm:w-auto border-primary/20 text-primary hover:bg-primary/5 pill transition-all duration-200"
                  >
                    <Link href="/contact">درخواست دمو</Link>
                  </Button>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs text-text-muted">
                  <span className="flex items-center gap-1.5">
                    <Shield
                      className="w-3.5 h-3.5 text-accent/60"
                      aria-hidden="true"
                    />
                    بدون نیاز به کارت اعتباری
                  </span>
                  <span
                    className="w-px h-3 bg-border-soft hidden sm:block"
                    aria-hidden="true"
                  />
                  <span className="flex items-center gap-1.5">
                    <Clock
                      className="w-3.5 h-3.5 text-accent/60"
                      aria-hidden="true"
                    />
                    فعال‌سازی آنی
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
