"use client";

import Image, { type ImageProps } from "next/image";
import { useState, type ReactNode } from "react";

type SafeImageProps = Omit<ImageProps, "src" | "alt" | "onError"> & {
  /** مقدار خروجی mediaUrl(). رشتهٔ خالی یا null قابل قبول است. */
  src: string | null | undefined;
  alt: string;
  /** چیزی که وقتی تصویر نیست یا لود نشد نمایش داده می‌شود. */
  fallback?: ReactNode;
};

/**
 * <Image> با مدیریت خطا.
 *
 * چرا لازم است: کامپوننت‌های قبلی فقط وقتی fallback نشان می‌دادند که
 * مقدار تصویر null بود. ولی حالت رایج‌تر این است که مقدار وجود دارد ولی
 * فایل روی سرور نیست (۴۰۴) — مثلاً بعد از ری‌دیپلوی که MEDIA_ROOT پاک شده.
 * در این حالت کاربر یک کادر خالی یا آیکون شکستهٔ مرورگر می‌دید.
 *
 * این همان الگویی است که SoftwareCTA با imageFailed داشت، ولی قابل استفادهٔ مجدد.
 */
export default function SafeImage({
  src,
  alt,
  fallback = null,
  ...rest
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) return <>{fallback}</>;

  return (
    <Image src={src} alt={alt} onError={() => setFailed(true)} {...rest} />
  );
}
