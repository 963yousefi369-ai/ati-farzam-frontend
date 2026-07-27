"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Bell,
  MapPin,
  Monitor,
  Smartphone,
} from "lucide-react";

const ICONS = {
  monitor: Monitor,
  smartphone: Smartphone,
  bell: Bell,
  chart: BarChart3,
};

type SoftwareIcon = keyof typeof ICONS;

interface SoftwareFeature {
  icon?: SoftwareIcon;
  label?: string;
}

interface SoftwareCTAProps {
  title?: string;
  subtitle?: string;
  cta_primary_text?: string;
  cta_primary_link?: string;
  cta_secondary_text?: string;
  cta_secondary_link?: string;
  softwareImage?: string | null;
  features?: SoftwareFeature[];
}

const DEFAULT_FEATURES: SoftwareFeature[] = [
  { icon: "monitor", label: "داشبورد تحت وب" },
  { icon: "smartphone", label: "اپلیکیشن موبایل" },
  { icon: "bell", label: "هشدارهای لحظه‌ای" },
  { icon: "chart", label: "گزارش‌گیری دقیق" },
];

export default function SoftwareCTA({
  title,
  subtitle,
  cta_primary_text,
  cta_primary_link,
  cta_secondary_text,
  cta_secondary_link,
  softwareImage,
  features,
}: SoftwareCTAProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const visibleFeatures = features?.length ? features : DEFAULT_FEATURES;
  const showImage = Boolean(softwareImage && !imageFailed);

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-dark text-white shadow-elevated">
      <div className="grid items-center gap-10 p-6 sm:p-8 lg:grid-cols-[minmax(0,.9fr)_minmax(420px,1.1fr)] lg:gap-14 lg:p-12">
        <div>
          <p className="mb-4 flex items-center gap-2 text-sm font-medium text-accent">
            <span
              className="h-2 w-2 rounded-full bg-accent"
              aria-hidden="true"
            />
            نرم‌افزار اختصاصی آتی فرزام
          </p>

          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
            {title || "پلتفرم ردیابی هوشمند"}
          </h2>

          <p className="mt-5 max-w-[58ch] text-base leading-8 text-white/75">
            {subtitle ||
              "مدیریت ناوگان از هر دستگاه؛ با داشبورد وب، اپلیکیشن موبایل، هشدارهای فوری و گزارش‌گیری لحظه‌ای."}
          </p>

          <ul role="list" className="mt-7 grid gap-3 sm:grid-cols-2">
            {visibleFeatures.map(
              ({ icon = "monitor", label = "ویژگی نرم‌افزار" }) => {
                const Icon = ICONS[icon] || Monitor;
                return (
                  <li
                    key={label}
                    className="flex min-h-12 items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-white/105"
                  >
                    <Icon
                      className="h-4 w-4 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    {label}
                  </li>
                );
              },
            )}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={cta_primary_link || "/software"}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-6 text-sm font-semibold text-dark transition-colors duration-200 hover:bg-accent-light"
            >
              {cta_primary_text || "آشنایی با نرم‌افزار"}
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href={cta_secondary_link || "/contact"}
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 text-sm font-medium text-white transition-colors duration-200 hover:bg-white/10"
            >
              {cta_secondary_text || "درخواست دمو"}
            </Link>
          </div>
        </div>

        <div
          className={
            showImage
              ? "relative aspect-[4/3] bg-transparent"
              : "relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-dark-deeper"
          }
        >
          {showImage ? (
            <Image
              src={softwareImage!}
              alt={title || "نمای پلتفرم ردیابی هوشمند"}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-contain"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="absolute inset-5 overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <div className="flex h-11 items-center justify-between border-b border-white/10 px-4">
                <span className="text-xs font-semibold text-white/100">
                  داشبورد مدیریت ناوگان
                </span>
                <span className="flex items-center gap-1.5 text-xs text-accent">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  آنلاین
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 top-11 grid gap-3 p-4 sm:grid-cols-[1.3fr_.7fr]">
                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-dark">
                  <svg
                    viewBox="0 0 460 260"
                    className="absolute inset-0 h-full w-full text-white/10"
                    aria-hidden="true"
                  >
                    <path
                      d="M-20 220C65 140 125 230 200 145S345 90 490 25"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="7 8"
                    />
                    <path
                      d="M20 35C110 95 185 25 270 95S410 175 480 135"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <span className="absolute left-[30%] top-[38%] flex h-10 w-10 items-center justify-center rounded-full border-4 border-dark bg-accent text-dark">
                    <MapPin className="h-5 w-5" />
                  </span>
                </div>
                <div className="grid gap-3">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs text-white/50">خودروهای فعال</p>
                    <p className="mt-2 text-xl font-semibold tabular-nums text-white">
                      ۲۴
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs text-white/50">هشدارهای امروز</p>
                    <p className="mt-2 text-xl font-semibold tabular-nums text-accent">
                      ۳
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
