import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getSettings, getSoftwarePage, djangoImageUrl } from "@/lib/api/django";
import BreadcrumbTrail from "@/components/trail/BreadcrumbTrail";
import SectionTitle from "@/components/shared/SectionTitle";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import RouteArtwork from "@/components/shared/RouteArtwork";
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
  Quote,
  Star,
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
  openGraph: {
    title: "نرم‌افزار مای فرزام | مدیریت ناوگان",
    description: "سامانه آنلاین مدیریت ناوگان و ردیابی خودرو",
    locale: "fa_IR",
    type: "website",
  },
};

export const revalidate = 604800;

const STATS = [
  {
    value: 10000,
    suffix: "+",
    label: "خودروی تحت پوشش",
    icon: MapPin,
    color: "text-accent",
  },
  {
    value: 500,
    suffix: "+",
    label: "شرکت فعال",
    icon: Users,
    color: "text-primary",
  },
  {
    value: 99.9,
    suffix: "%",
    label: "آپتایم سامانه",
    icon: Activity,
    color: "text-accent",
  },
  {
    value: 24,
    suffix: "/۷",
    label: "پشتیبانی فنی",
    icon: Headset,
    color: "text-primary",
  },
];

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
  },
  {
    icon: Cloud,
    title: "بدون نصب",
    desc: "دسترسی کامل از طریق مرورگر، بدون نرم‌افزار جانبی.",
    accent: "bg-primary/10 text-primary",
  },
  {
    icon: Clock,
    title: "به‌روزرسانی لحظه‌ای",
    desc: "موقعیت خودروها با فاصله کمتر از ۱۰ ثانیه.",
    accent: "bg-warning/10 text-warning",
  },
  {
    icon: Headphones,
    title: "پشتیبانی ۲۴/۷",
    desc: "تیم پشتیبانی ما در تمام ساعات شبانه‌روز آماده کمک.",
    accent: "bg-error/10 text-error",
  },
];

const TESTIMONIALS = [
  {
    name: "احمد محمدی",
    role: "مدیر ناوگان، شرکت حمل‌ونقل پیشرو",
    text: "با استفاده از سیستم ردیابی مای فرزام، مصرف سوخت ناوگان ما ۲۵٪ کاهش پیدا کرد. پشتیبانی عالی و نرم‌افزار بسیار کاربردی.",
    rating: 5,
  },
  {
    name: "سارا احمدی",
    role: "مدیرعامل، تاکسی‌سرویس شهری",
    text: "نرم‌افزار مدیریت ناوگانشون خیلی ساده و کاربردیه. آموزش تیممون فقط نیم ساعت طول کشید. پیشنهاد می‌کنم.",
    rating: 5,
  },
  {
    name: "رضا کریمی",
    role: "مدیر لجستیک، شرکت پخش سراسری",
    text: "هشدارهای آنی سامانه باعث شد چندین سرقت خودرو رو به‌موقع متوقف کنیم. سرمایه‌گذاری روی امنیت ناوگان ارزشش رو داره.",
    rating: 4,
  },
];

export default async function SoftwarePage() {
  let settings: any = null;
  let swPage: any = null;
  try {
    settings = await getSettings();
  } catch {}
  try {
    swPage = await getSoftwarePage();
  } catch {}

  const loginUrl: string =
    swPage?.login_url || settings?.software_login_url || "#";
  const heroImage: string | null = swPage?.hero_image || null;
  const softwareImage =
    swPage?.dashboard_image ||
    (settings?.software_image ? djangoImageUrl(settings.software_image) : null);
  const softwareDesc: string =
    swPage?.dashboard_description || settings?.software_description || "";
  const mobileImage: string | null = swPage?.mobile_image || null;

  const apiFeatures: any[] = swPage?.features ?? [];
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

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "نرم‌افزار مای فرزام",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web, Android, iOS",
            description: "سامانه آنلاین مدیریت ناوگان و ردیابی خودرو",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "IRR",
              description: "دمو رایگان",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              ratingCount: "150",
            },
          }),
        }}
      />

      {/* Hero — Signal Route identity */}
      <section className="relative isolate overflow-hidden bg-dark pb-12 pt-6 text-white sm:pb-16 md:pb-24 md:pt-10">
        <RouteArtwork className="pointer-events-none absolute inset-0 z-0 h-full w-full text-accent opacity-[0.22]" />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-t from-dark to-transparent"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <BreadcrumbTrail />

          <div className="mx-auto max-w-3xl text-center">
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-white/80 sm:text-sm">
              <Zap className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              سامانه مدیریت هوشمند ناوگان
            </p>

            <h1 className="mt-5 text-3xl font-bold leading-[1.2] text-white sm:text-4xl md:text-5xl">
              نرم‌افزار مای فرزام
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-base md:text-lg md:leading-8">
              موقعیت لحظه‌ای، گزارش دقیق و هشدار فوری؛ همه در یک داشبورد.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                asChild
                className="pill min-h-12 bg-accent px-7 text-white transition-colors hover:bg-accent-dark"
              >
                <Link href={loginUrl} target="_blank" rel="noopener noreferrer">
                  <Monitor className="ml-2 h-5 w-5" /> ورود به سامانه
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="pill min-h-12 border border-white/25 bg-transparent px-7 text-white transition-colors hover:border-white/40 hover:bg-white/[0.08] hover:text-white"
              >
                <Link href="/contact">
                  <Smartphone className="ml-2 h-5 w-5" /> درخواست دمو رایگان
                </Link>
              </Button>
            </div>

            <p className="mt-6 inline-flex items-center gap-2 text-xs text-white/45">
              <span className="h-px w-8 bg-accent" aria-hidden="true" />
              بدون نصب، بدون کارت اعتباری، ۱۴ روز رایگان
            </p>
          </div>

          {/* Dashboard preview */}
          <div className="mx-auto mt-10 max-w-3xl md:mt-14">
            {heroImage ? (
              <div className="relative aspect-[560/380] w-full">
                <Image
                  src={heroImage}
                  alt="نرم‌افزار مای فرزام"
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
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-20 -mt-8 md:-mt-10">
        <div className="mx-auto max-w-5xl px-4">
          <div className="rounded-3xl border border-border-soft bg-white p-5 shadow-elevated sm:p-6 md:p-8">
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-8">
              {STATS.map(({ value, suffix, label, icon: Icon, color }) => (
                <div key={label} className="text-center">
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-bg-muted">
                    <Icon className={`h-5 w-5 ${color}`} aria-hidden="true" />
                  </div>
                  <div className="mb-1 text-xl font-bold text-text-heading sm:text-2xl md:text-3xl">
                    <AnimatedCounter value={value} suffix={suffix} />
                  </div>
                  <div className="text-xs text-text-muted md:text-sm">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-section-mobile md:py-section-desktop">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle
            title="امکانات سامانه"
            subtitle="تمام ابزارهای لازم برای مدیریت حرفه‌ای ناوگان"
            centered
          />
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
            {features.map(
              ({ icon: Icon, title, desc, accent, span, image }) => (
                <div
                  key={title}
                  className={`group relative h-full overflow-hidden rounded-3xl border border-border-soft bg-white p-5 transition-transform duration-200 hover:-translate-y-1 md:p-6 ${span}`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl ${accent}`}
                    >
                      {image ? (
                        <Image
                          src={image}
                          alt={title}
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
                      <h3 className="mb-1.5 text-base font-bold text-text-heading">
                        {title}
                      </h3>
                      <p className="text-sm leading-7 text-text-body">{desc}</p>
                    </div>
                  </div>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-5 bottom-0 h-px origin-right scale-x-0 bg-accent/50 transition-transform duration-200 group-hover:scale-x-100"
                  />
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Dashboard */}
      <section className="bg-muted py-section-mobile md:py-section-desktop">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle
            title="داشبورد مدیریت ناوگان"
            subtitle="مشاهده لحظه‌ای موقعیت، مسیر و وضعیت خودروها"
            centered
          />
          <div className="relative mx-auto max-w-4xl">
            {softwareImage ? (
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={softwareImage}
                  alt="داشبورد نرم‌افزار مای فرزام"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="relative aspect-[560/380] overflow-hidden rounded-3xl border border-border-base bg-navy-deeper p-4 shadow-elevated md:p-6">
                <DashboardMockup className="h-full w-full" />
              </div>
            )}

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-white px-3 py-1.5 text-xs text-text-body">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-accent/50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                داده زنده — به‌روزرسانی هر ۱۰ ثانیه
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-white px-3 py-1.5 text-xs text-text-body">
                <Activity
                  className="h-3.5 w-3.5 text-accent"
                  aria-hidden="true"
                />
                آپتایم ۹۹.۹٪
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-white px-3 py-1.5 text-xs text-text-body">
                <BarChart3
                  className="h-3.5 w-3.5 text-primary"
                  aria-hidden="true"
                />
                بیش از ۱۲۰ گزارش
              </span>
            </div>
          </div>

          {softwareDesc && (
            <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-8 text-text-body">
              {softwareDesc}
            </p>
          )}
        </div>
      </section>

      {/* Mobile app */}
      <section className="py-section-mobile md:py-section-desktop">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 md:flex-row md:gap-16">
            <div className="w-full max-w-[260px] shrink-0">
              {mobileImage ? (
                <div className="relative aspect-[260/520] w-full">
                  <Image
                    src={mobileImage}
                    alt="اپلیکیشن موبایل مای فرزام"
                    fill
                    className="object-contain drop-shadow-2xl"
                    sizes="260px"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="relative mx-auto aspect-[220/440] w-[220px]">
                  <div className="absolute inset-0 overflow-hidden rounded-[36px] border-[3px] border-primary/15 bg-navy-deeper shadow-elevated">
                    <div className="flex h-10 items-center justify-between px-6 pt-2">
                      <span className="text-[10px] text-white/50">۱۲:۳۰</span>
                      <span className="flex gap-1.5">
                        <Wifi className="h-3 w-3 text-white/40" />
                        <Battery className="h-3 w-3 text-white/40" />
                      </span>
                    </div>

                    <div className="px-4 pb-2 pt-1">
                      <div className="mb-3 flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/20">
                          <MapPin className="h-3.5 w-3.5 text-accent" />
                        </span>
                        <span className="text-[11px] font-medium text-white/70">
                          مای فرزام
                        </span>
                      </div>

                      <div className="relative h-[160px] w-full overflow-hidden rounded-xl bg-dark/80">
                        <svg
                          viewBox="0 0 180 160"
                          className="absolute inset-0 h-full w-full"
                          fill="none"
                          aria-hidden="true"
                        >
                          {[40, 80, 120].map((y) => (
                            <line
                              key={`h-${y}`}
                              x1="0"
                              y1={y}
                              x2="180"
                              y2={y}
                              stroke="rgba(255,255,255,0.12)"
                              strokeWidth="1"
                            />
                          ))}
                          {[45, 90, 135].map((x) => (
                            <line
                              key={`v-${x}`}
                              x1={x}
                              y1="0"
                              x2={x}
                              y2="160"
                              stroke="rgba(255,255,255,0.12)"
                              strokeWidth="1"
                            />
                          ))}
                          <path
                            d="M30 130 Q60 90 90 100 T150 60"
                            stroke="#14B8A6"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                          />
                          {[
                            { x: 30, y: 130 },
                            { x: 90, y: 100 },
                            { x: 150, y: 60 },
                          ].map((p) => (
                            <g key={`${p.x}-${p.y}`}>
                              <circle
                                cx={p.x}
                                cy={p.y}
                                r="7"
                                fill="#14B8A6"
                                opacity="0.25"
                              />
                              <circle
                                cx={p.x}
                                cy={p.y}
                                r="3.5"
                                fill="#14B8A6"
                              />
                            </g>
                          ))}
                        </svg>
                      </div>
                    </div>

                    <div className="mt-1 space-y-2 px-4">
                      <div className="flex items-center gap-2.5 rounded-lg bg-white/5 p-2.5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/15">
                          <Zap className="h-3.5 w-3.5 text-accent" />
                        </span>
                        <span className="block">
                          <span className="block text-[9px] text-white/40">
                            وضعیت
                          </span>
                          <span className="block text-[11px] font-medium text-white/80">
                            فعال — ۳ خودرو
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 rounded-lg bg-white/5 p-2.5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-warning/15">
                          <Bell className="h-3.5 w-3.5 text-warning" />
                        </span>
                        <span className="block">
                          <span className="block text-[9px] text-white/40">
                            هشدارها
                          </span>
                          <span className="block text-[11px] font-medium text-white/80">
                            ۲ هشدار جدید
                          </span>
                        </span>
                      </div>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 flex h-12 items-center justify-around border-t border-white/5 bg-dark/90 px-4">
                      {[MapPin, BarChart3, Bell, Smartphone].map((Icon, i) => (
                        <span
                          key={i}
                          className={`flex h-8 w-8 items-center justify-center rounded-lg ${i === 0 ? "bg-accent/15" : ""}`}
                        >
                          <Icon
                            className={`h-4 w-4 ${i === 0 ? "text-accent" : "text-white/30"}`}
                          />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 text-center md:text-right">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
                <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
                اپلیکیشن موبایل
              </p>
              <h2 className="mb-3 text-xl font-bold leading-tight text-text-heading sm:text-2xl md:text-3xl">
                مدیریت ناوگان در جیب شما
              </h2>
              <p className="mx-auto mb-6 max-w-md text-sm leading-7 text-text-body md:mx-0">
                با اپلیکیشن موبایل مای فرزام، ناوگان خود را از هر کجا مدیریت
                کنید. هشدارهای آنی، ردیابی لحظه‌ای و گزارش‌گیری مستقیم از گوشی.
              </p>

              <div className="mx-auto mb-6 grid max-w-sm grid-cols-1 gap-3 sm:grid-cols-2 md:mx-0">
                {[
                  { icon: Bell, text: "هشدار آنی", desc: "لحظه‌ای" },
                  { icon: MapPin, text: "ردیابی آفلاین", desc: "بدون اینترنت" },
                  { icon: Wifi, text: "همگام‌سازی خودکار", desc: "لحظه‌ای" },
                  { icon: Battery, text: "مصرف بهینه باتری", desc: "کم‌مصرف" },
                ].map(({ icon: Icon, text, desc }) => (
                  <div key={text} className="flex items-start gap-3 text-right">
                    <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10">
                      <Icon
                        className="h-4 w-4 text-accent"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="block">
                      <span className="block text-sm font-bold text-text-heading">
                        {text}
                      </span>
                      <span className="mt-0.5 block text-xs text-text-muted">
                        {desc}
                      </span>
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                {[
                  { label: "Google Play", aria: "دانلود از گوگل پلی" },
                  { label: "بازار", aria: "دانلود از بازار" },
                ].map(({ label, aria }) => (
                  <Button
                    key={label}
                    size="lg"
                    asChild
                    className="pill min-h-12 gap-2 bg-dark px-6 font-bold text-white transition-colors hover:bg-dark-deeper"
                  >
                    <a href="#" aria-label={aria}>
                      <Download className="h-5 w-5" aria-hidden="true" />
                      <span className="text-right text-xs leading-tight">
                        <span className="block text-white/60">دانلود از</span>
                        <span className="block font-bold">{label}</span>
                      </span>
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits — numbered route steps */}
      <section className="py-section-mobile md:py-section-desktop">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle
            title="مزایای استفاده از سامانه"
            subtitle="از ثبت‌نام تا پشتیبانی، مسیر روشن است"
            centered
          />
          <div className="mx-auto max-w-3xl space-y-3">
            {BENEFITS.map(({ icon: Icon, title, desc, accent }) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-3xl border border-border-soft bg-white p-5 md:p-6"
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ${accent}`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1.5 text-base font-bold text-text-heading">
                      {title}
                    </h3>
                    <p className="text-sm leading-7 text-text-body">{desc}</p>
                  </div>
                </div>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-5 bottom-0 h-px origin-right scale-x-0 bg-accent/50 transition-transform duration-200 group-hover:scale-x-100"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted py-section-mobile md:py-section-desktop">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle
            title="نظرات مشتریان"
            subtitle="ببینید مشتریان ما درباره مای فرزام چه می‌گویند"
            centered
          />
          <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-auto md:grid md:max-w-5xl md:grid-cols-3 md:overflow-visible md:px-0">
            {TESTIMONIALS.map(({ name, role, text, rating }) => (
              <figure
                key={name}
                className="relative flex w-[85%] flex-none snap-start flex-col overflow-hidden rounded-3xl border border-border-soft bg-white p-5 sm:w-[70%] md:w-auto md:p-6"
              >
                <Quote
                  className="absolute left-4 top-4 h-9 w-9 text-accent/10"
                  aria-hidden="true"
                />
                <div
                  className="mb-4 flex gap-0.5"
                  aria-label={`امتیاز ${rating} از ۵`}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      aria-hidden="true"
                      className={`h-4 w-4 ${
                        star <= rating
                          ? "fill-warning text-warning"
                          : "fill-bg-muted text-border-soft"
                      }`}
                    />
                  ))}
                </div>
                <blockquote className="mb-5 flex-1 text-sm leading-7 text-text-body">
                  {text}
                </blockquote>
                <figcaption className="flex items-center gap-3 border-t border-border-soft pt-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                    {name.charAt(0)}
                  </span>
                  <span className="block">
                    <span className="block text-sm font-bold text-text-heading">
                      {name}
                    </span>
                    <span className="block text-xs text-text-muted">
                      {role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-section-mobile md:py-section-desktop">
        <div className="mx-auto max-w-7xl px-4">
          <SectionTitle
            title="سوالات متداول"
            subtitle="پاسخ سوالات رایج درباره نرم‌افزار مای فرزام"
            centered
          />
          <SoftwareFAQ />
          <div className="mt-8 text-center">
            <p className="mb-3 text-sm text-text-muted">
              پاسخ سوال خود را پیدا نکردید؟
            </p>
            <Button
              variant="outline"
              asChild
              className="pill min-h-11 border-primary/20 text-primary hover:bg-primary/5"
            >
              <Link href="/contact">
                <MessageSquare className="ml-2 h-4 w-4" /> تماس با پشتیبانی
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section-mobile md:py-section-desktop">
        <div className="mx-auto max-w-5xl px-4">
          <div className="relative isolate overflow-hidden rounded-3xl bg-dark px-5 py-10 text-center text-white sm:px-8 md:px-12 md:py-14">
            <RouteArtwork className="pointer-events-none absolute inset-0 z-0 h-full w-full text-accent opacity-20" />
            <div className="relative z-10">
              <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-dark">
                <Monitor className="h-7 w-7" aria-hidden="true" />
              </span>
              <h2 className="text-xl font-bold sm:text-2xl md:text-3xl">
                آماده شروع هستید؟
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-white/70">
                همین حالا وارد سامانه شوید و ناوگان خود را هوشمند مدیریت کنید.
              </p>
              <p className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-medium text-accent">
                <Zap className="h-3 w-3" aria-hidden="true" />
                ۱۴ روز رایگان امتحان کنید
              </p>

              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  size="lg"
                  asChild
                  className="pill min-h-12 bg-accent px-8 font-bold text-dark transition-colors hover:bg-accent-light"
                >
                  <Link
                    href={loginUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Monitor className="ml-2 h-5 w-5" /> ورود به سامانه
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="pill min-h-12 border border-white/25 bg-transparent px-8 text-white transition-colors hover:border-white/40 hover:bg-white/[0.08] hover:text-white"
                >
                  <Link href="/contact">درخواست دمو</Link>
                </Button>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-white/45">
                <span className="flex items-center gap-1.5">
                  <Shield
                    className="h-3.5 w-3.5 text-accent"
                    aria-hidden="true"
                  />
                  بدون نیاز به کارت اعتباری
                </span>
                <span className="hidden h-3 w-px bg-white/15 sm:block" />
                <span className="flex items-center gap-1.5">
                  <Clock
                    className="h-3.5 w-3.5 text-accent"
                    aria-hidden="true"
                  />
                  فعال‌سازی آنی
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
