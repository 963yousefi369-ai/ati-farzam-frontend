'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { publicImageUrl } from '@/lib/api/django'
import { ArrowLeft, Shield, Clock, Users } from 'lucide-react'

interface AboutCompactProps {
  title?: string
  aboutText?: string
  aboutImage?: string | null
  ctaText?: string
  ctaLink?: string
}

const EASE = [0.16, 1, 0.3, 1] as const

const HIGHLIGHTS = [
  { icon: Shield, label: 'ضمانت اصالت' },
  { icon: Clock, label: '۱۲ سال تجربه' },
  { icon: Users, label: '+۶۰۰۰ مشتری' },
]

export default function AboutCompact({ title, aboutText, aboutImage, ctaText, ctaLink }: AboutCompactProps) {
  const imageUrl = aboutImage ? publicImageUrl(aboutImage) : null
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {imageUrl && (
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative aspect-[4/3] rounded-2xl overflow-hidden order-2 md:order-1 group shadow-card hover:shadow-hover hover-glow border border-accent/10"
        >
          <Image
            src={imageUrl}
            alt={title ?? 'درباره آتی فرزام ایرانیان'}
            fill
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/15 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Corner accent */}
          <div className="absolute bottom-4 right-4 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400 shadow-sm">
            <ArrowLeft className="w-4 h-4 text-primary" />
          </div>
        </motion.div>
      )}

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        className={imageUrl ? 'order-1 md:order-2' : 'md:col-span-2'}
      >
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="text-xs font-semibold text-primary">درباره ما</span>
        </div>

        <h2 className="text-2xl lg:text-3xl font-semibold text-text-heading mb-5 leading-tight">
          {title ?? 'آتی فرزام ایرانیان'}
        </h2>

        <p className="text-sm text-[#6B7280] leading-[1.9] mb-8 max-w-lg">
          {aboutText ?? 'شرکت آتی فرزام ایرانیان با بیش از یک دهه تجربه در حوزه ردیابی GPS، راهکارهای جامع مدیریت ناوگان و امنیت خودرو را به سازمان‌ها و افراد ارائه می‌دهد.'}
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-3 mb-8">
          {HIGHLIGHTS.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-border-soft text-sm font-medium text-text-heading transition-all duration-300 hover:border-accent/20 hover:-translate-y-0.5"
              style={{ boxShadow: '0 2px 8px rgba(59,90,128,0.04)' }}
            >
              <Icon className="w-4 h-4 text-accent" strokeWidth={1.75} />
              {label}
            </div>
          ))}
        </div>

        <Button
          asChild
          className="bg-primary text-white hover:bg-primary-dark rounded-xl px-7 py-3 transition-all duration-300 cursor-pointer shadow-[0_4px_14px_rgba(59,90,128,0.2)] hover:shadow-[0_8px_30px_rgba(59,90,128,0.3)]"
        >
          <Link href={ctaLink ?? '/about'} className="flex items-center gap-2">
            {ctaText ?? 'بیشتر بدانید'}
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
      </motion.div>
    </div>
  )
}
