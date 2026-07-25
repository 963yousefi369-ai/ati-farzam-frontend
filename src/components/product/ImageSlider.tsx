'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const PLACEHOLDER = '/placeholder-product.svg'

interface ImageSliderProps {
  images: string[]
  productName: string
}

function isValidSrc(src: string | undefined | null): boolean {
  return typeof src === 'string' && src.trim().length > 0
}

export default function ImageSlider({ images, productName }: ImageSliderProps) {
  const validImages = images.filter(isValidSrc)
  const safeImages = validImages.length > 0 ? validImages : [PLACEHOLDER]
  const [activeIndex, setActiveIndex] = useState(0)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const goNext = useCallback(() => setActiveIndex((prev) => (prev + 1) % safeImages.length), [safeImages.length])
  const goPrev = useCallback(() => setActiveIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length), [safeImages.length])

  // Keyboard navigation
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); goNext() }
      if (e.key === 'ArrowRight') { e.preventDefault(); goPrev() }
    }
    el.addEventListener('keydown', handleKey)
    return () => el.removeEventListener('keydown', handleKey)
  }, [goNext, goPrev])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext()
      else goPrev()
    }
  }

  return (
    <div className="flex flex-col gap-3 select-none">
      {/* Main image — keyboard-focusable region */}
      <div
        ref={containerRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={`تصاویر ${productName}`}
        tabIndex={0}
        className="relative w-full aspect-square rounded-2xl overflow-hidden border border-border-soft bg-white focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={safeImages[activeIndex]}
          alt={`${productName} — تصویر ${activeIndex + 1}`}
          fill
          className="object-contain p-8"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={activeIndex === 0}
          unoptimized={safeImages[activeIndex] === PLACEHOLDER}
        />

        {/* Slide indicator for screen readers */}
        <span className="sr-only" aria-live="polite">
          تصویر {activeIndex + 1} از {safeImages.length}
        </span>

        {safeImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-white border border-border-soft shadow-[var(--shadow-card)] flex items-center justify-center text-primary hover:bg-bg-muted transition-colors focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="تصویر قبلی"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-white border border-border-soft shadow-[var(--shadow-card)] flex items-center justify-center text-primary hover:bg-bg-muted transition-colors focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="تصویر بعدی"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {safeImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto" role="tablist" aria-label="انتخاب تصویر" dir="rtl">
          {safeImages.map((src, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={activeIndex === idx}
              aria-label={`تصویر ${idx + 1}`}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                'relative w-20 h-20 shrink-0 rounded-xl border-2 overflow-hidden bg-white transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring',
                activeIndex === idx
                  ? 'border-accent ring-2 ring-accent-light'
                  : 'border-border-soft hover:border-accent'
              )}
            >
              <Image
                src={src}
                alt="تصویر محصول"
                fill
                className="object-contain p-2"
                sizes="80px"
                unoptimized={src === PLACEHOLDER}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
