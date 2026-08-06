import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock3, ShieldCheck, Users } from "lucide-react";
import { publicImageUrl } from "@/lib/api/django";

interface AboutCompactProps {
  title?: string;
  aboutText?: string;
  aboutImage?: string | null;
  ctaText?: string;
  ctaLink?: string;
}

const HIGHLIGHTS = [
  { icon: ShieldCheck, value: "ضمانت معتبر", label: "اصالت و سلامت دستگاه" },
  { icon: Clock3, value: "۱۲ سال", label: "تجربه تخصصی" },
  { icon: Users, value: "+۶۰۰۰", label: "مشتری فعال" },
];

export default function AboutCompact({
  title,
  aboutText,
  aboutImage,
  ctaText,
  ctaLink,
}: AboutCompactProps) {
  const imageUrl = aboutImage ? publicImageUrl(aboutImage) : null;

  return (
    <div
      className={
        imageUrl
          ? "grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
          : "mx-auto max-w-3xl"
      }
    >
      <div>
        <p className="mb-4 flex items-center gap-2 text-sm font-medium text-primary">
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          درباره آتی فرزام
        </p>

        <h2 className="text-2xl font-bold leading-tight text-dark sm:text-3xl lg:text-4xl">
          {title || "تجربه‌ای مطمئن در ردیابی هوشمند"}
        </h2>

        <p className="mt-5 max-w-[65ch] text-base leading-8 text-text-secondary">
          {aboutText ||
            "شرکت آتی فرزام ایرانیان با بیش از یک دهه تجربه در حوزه ردیابی GPS، راهکارهای جامع مدیریت ناوگان و امنیت خودرو را به سازمان‌ها و افراد ارائه می‌دهد."}
        </p>

        <ul
          role="list"
          aria-label="دستاوردهای آتی فرزام"
          className="mt-7 grid gap-px overflow-hidden rounded-2xl border border-border-soft bg-border-soft sm:grid-cols-3"
        >
          {HIGHLIGHTS.map(({ icon: Icon, value, label }) => (
            <li key={label} className="flex items-center gap-3 bg-white p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-light-tint text-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <strong className="block text-sm font-semibold text-dark">
                  {value}
                </strong>
                <span className="mt-0.5 block text-xs leading-5 text-text-muted">
                  {label}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <Link
          href={ctaLink || "/about"}
          className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-dark"
        >
          {ctaText || "آشنایی بیشتر با ما"}
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      {imageUrl && (
        <div className="relative order-first aspect-[4/3] overflow-hidden rounded-3xl border border-border-soft bg-bg-soft shadow-card lg:order-last">
          <Image
            src={imageUrl}
            alt={title || "تیم آتی فرزام ایرانیان"}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}
