'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Monitor, Smartphone, Bell, BarChart3 } from 'lucide-react'

const ICONS = { monitor: Monitor, smartphone: Smartphone, bell: Bell, chart: BarChart3 }
type SoftwareIcon = keyof typeof ICONS

const FEATURES = [
  { icon: 'monitor', label: 'دشبورد وب' },
  { icon: 'smartphone', label: 'اپلیکیشن موبایل' },
  { icon: 'bell', label: 'هشدار لحظه‌ای' },
  { icon: 'chart', label: 'گزارش‌گیری' },
]

const EASE = [0.16, 1, 0.3, 1] as const

interface SoftwareFeature {
  icon?: SoftwareIcon
  label?: string
}

interface SoftwareCTAProps {
  title?: string
  subtitle?: string
  cta_primary_text?: string
  cta_primary_link?: string
  cta_secondary_text?: string
  cta_secondary_link?: string
  softwareImage?: string | null
  features?: SoftwareFeature[]
}

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
  const [imgFailed, setImgFailed] = useState(false)
  const showImage = softwareImage && !imgFailed
  const visibleFeatures: SoftwareFeature[] = features?.length ? features : FEATURES as SoftwareFeature[]
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="relative rounded-3xl overflow-hidden animated-border">
      {/* Animated gradient border glow */}
      {!prefersReducedMotion && (
        <div className="absolute -inset-[1px] rounded-3xl opacity-30 pointer-events-none" aria-hidden="true"
          style={{
            background: 'linear-gradient(135deg, var(--accent), var(--primary), var(--accent), var(--primary))',
            backgroundSize: '300% 300%',
            animation: 'gradient-shift 6s ease infinite',
            filter: 'blur(1px)',
          }}
        />
      )}

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-dark to-navy-deeper rounded-3xl" />

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Animated glows */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <motion.div
            className="absolute top-1/2 right-1/4 w-[350px] h-[350px] -translate-y-1/2 rounded-full opacity-[0.07]"
            style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-0 left-1/4 w-[250px] h-[250px] rounded-full opacity-[0.05]"
            style={{ background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          />
        </div>
      )}

      <div className="relative p-5 sm:p-8 lg:p-12 xl:p-16 text-white overflow-hidden">
        <div className="flex flex-col xl:flex-row items-center gap-10 xl:gap-16">
          <div className="flex-1 text-center xl:text-right">
            {/* Badge */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: -12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 0 20px rgba(20,184,166,0.08)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-semibold text-white/70">نرم‌افزار اختصاصی</span>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="text-3xl lg:text-4xl xl:text-5xl font-semibold mb-5 leading-tight text-accent"
            >
              {title ?? 'پلتفرم ردیابی هوشمند'}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              className="text-base lg:text-lg text-white/65 leading-[1.8] mb-9 max-w-lg mx-auto xl:mx-0"
            >
              {subtitle ?? 'مدیریت ناوگان از هر دستگاهی — دشبورد وب، اپلیکیشن موبایل و گزارش‌گیری لحظه‌ای'}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
              className="flex gap-4 flex-wrap justify-center xl:justify-start items-center mb-10"
            >
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent-dark text-white rounded-xl px-8 transition-all duration-300 cursor-pointer"
                style={{ boxShadow: '0 4px 14px rgba(20,184,166,0.25)' }}
              >
                <Link href={cta_primary_link ?? '/software'}>{cta_primary_text ?? 'آشنایی با نرم‌افزار'}</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="text-white/65 hover:text-white hover:bg-white/[0.08] rounded-xl px-6 transition-all duration-300 cursor-pointer border border-white/[0.08] hover:border-white/[0.15]"
              >
                <Link href={cta_secondary_link ?? '/contact'}>{cta_secondary_text ?? 'درخواست دمو'}</Link>
              </Button>
            </motion.div>

            {/* Feature chips */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
              className="flex gap-3 flex-wrap justify-center xl:justify-start"
            >
              {visibleFeatures.map(({ icon = 'monitor', label = 'ویژگی نرم‌افزار' }, i) => {
                const Icon = ICONS[icon as SoftwareIcon] ?? Monitor
                return (
                  <motion.div
                    key={label}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.08, ease: EASE }}
                    className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm font-medium hover:bg-white/[0.1] hover:border-accent/25 transition-all duration-300 cursor-default"
                  >
                    <Icon className="w-4 h-4 text-accent/70 group-hover:text-accent transition-colors duration-300" />
                    {label}
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* Dashboard mockup */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -30, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="relative w-full xl:w-[520px] shrink-0 flex justify-center"
          >
            {showImage ? (
              <div className="relative w-full aspect-[4/3]">
                <Image src={softwareImage} alt={title ?? 'پلتفرم ردیابی هوشمند'} fill className="object-contain drop-shadow-2xl" sizes="(max-width: 1280px) 80vw, 520px" onError={() => setImgFailed(true)} />
              </div>
            ) : (
              <div className="relative flex items-end justify-center gap-4 p-4 sm:p-8">
                {/* Desktop mockup */}
                <div className="hidden sm:block w-72 lg:w-80">
                  <div className="rounded-t-xl border-[3px] border-b-0 border-white/10 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                    <div className="flex items-center gap-1.5 px-3 py-2 bg-white/[0.06]">
                      <span className="w-2 h-2 rounded-full bg-red-400/50" />
                      <span className="w-2 h-2 rounded-full bg-yellow-400/50" />
                      <span className="w-2 h-2 rounded-full bg-green-400/50" />
                    </div>
                    <div className="bg-navy-dark p-6 h-44 flex flex-col justify-center gap-3">
                      <div className="h-2.5 w-3/4 rounded-full bg-white/20" />
                      <div className="h-2 w-1/2 rounded-full bg-white/10" />
                      <div className="flex gap-2 mt-3">
                        <div className="h-12 w-24 rounded-lg bg-accent/25 border border-accent/10" />
                        <div className="h-12 w-24 rounded-lg bg-white/[0.06] border border-white/[0.06]" />
                        <div className="h-12 w-24 rounded-lg bg-accent/15 border border-accent/10" />
                      </div>
                    </div>
                  </div>
                  <div className="h-3 rounded-b-xl bg-white/[0.06] border-[3px] border-t-0 border-white/10" />
                  <div className="mx-auto w-14 h-1 rounded-b bg-white/10" />
                </div>

                {/* Mobile mockup */}
                <div className="hidden min-[400px]:block w-24 lg:w-28 -ml-4 sm:-ml-6">
                  <div className="rounded-2xl border-[3px] border-white/10 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                    <div className="h-5 bg-white/[0.06] flex items-center justify-center">
                      <span className="w-6 h-1 rounded-full bg-white/10" />
                    </div>
                    <div className="bg-navy-dark p-3 h-44 flex flex-col gap-2">
                      <div className="h-1.5 w-3/4 rounded-full bg-white/20" />
                      <div className="h-1.5 w-1/2 rounded-full bg-white/10" />
                      <div className="flex-1 rounded-lg bg-white/[0.04] mt-1 border border-white/[0.04]" />
                      <div className="h-7 rounded-lg bg-accent/30 border border-accent/10" />
                    </div>
                    <div className="h-5 bg-white/[0.06] flex items-center justify-center">
                      <span className="w-8 h-1 rounded-full bg-white/10" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
