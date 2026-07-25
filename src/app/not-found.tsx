'use client'

import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'
import SatelliteOrbit from '@/components/tracking/SatelliteOrbit'
import TrailDot from '@/components/trail/TrailDot'
import MagneticButton from '@/components/shared/MagneticButton'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/5 right-1/4 w-80 h-80 rounded-full blur-[100px] animate-breathe"
          style={{ background: 'radial-gradient(circle, rgba(14,116,144,0.1) 0%, transparent 70%)' }}
        />
      </div>

      <div className="text-center max-w-lg relative z-10">
        <div className="flex justify-center mb-6 animate-fade-in-up">
          <SatelliteOrbit size={56} duration={10} />
        </div>

        <h1
          className="text-8xl md:text-9xl font-semibold mb-2 tracking-tight animate-scale-in text-primary"
        >
          ۴۰۴
        </h1>

        <div className="flex justify-center mb-6 animate-fade-in-up" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
          <TrailDot showLabel={false} />
        </div>

        <h2 className="text-xl md:text-2xl font-semibold text-primary mb-3 animate-fade-in-up" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
          ماهواره ارتباط برقرار نمی‌کند
        </h2>

        <p className="text-text-muted text-sm leading-relaxed mb-10 animate-fade-in-up" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
          سیگنال این مسیر قطع شده است. مقصد مورد نظر شما در مدار ما ثبت نشده یا مسیر آن تغییر کرده است.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
          <MagneticButton
            as="a"
            href="/"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-semibold text-white bg-primary hover:bg-primary-dark transition-[transform,box-shadow,background-color,color,border-color] duration-300"
          >
            <ArrowRight className="w-4 h-4" />
            بازگشت به خانه
          </MagneticButton>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-medium text-primary/60 hover:text-primary border border-border-soft hover:border-primary/20 transition-[transform,box-shadow,background-color,color,border-color] duration-200"
          >
            <Search className="w-4 h-4" />
            جستجوی محصولات
          </Link>
        </div>
      </div>

      {[
        { size: 6, top: '12%', left: '8%', color: 'var(--navy)', dur: 4 },
        { size: 10, top: '22%', left: '85%', color: 'var(--teal)', dur: 5 },
        { size: 5, top: '80%', left: '78%', color: 'var(--navy)', dur: 3.5 },
        { size: 12, top: '45%', left: '5%', color: 'var(--teal)', dur: 7 },
        { size: 4, top: '35%', left: '70%', color: 'var(--navy)', dur: 5.5 },
      ].map((dot, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float"
          style={{
            width: dot.size,
            height: dot.size,
            top: dot.top,
            left: dot.left,
            background: dot.color,
            opacity: 0.12,
            animationDuration: `${dot.dur}s`,
            animationDelay: `${i * 0.6}s`,
          }}
        />
      ))}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in-up" style={{ animationDelay: '1s', animationFillMode: 'both' }}>
        <div className="flex items-center gap-2 text-xs text-border-base">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span>در حال جستجوی سیگنال...</span>
        </div>
      </div>
    </div>
  )
}
