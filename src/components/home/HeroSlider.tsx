'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useTransform, useInView, useReducedMotion } from 'framer-motion'
import { ChevronRight, ChevronLeft, ArrowLeft, Users, Radio as RadioIcon, Trophy, Shield, Headset } from 'lucide-react'
import { Button } from '@/components/ui/button'

/* ── Positioning metadata (optional, from backend) ── */
interface ForegroundPositioning {
  foreground_position?: string
  foreground_scale_mobile?: number
  foreground_scale_desktop?: number
  foreground_offset_y_mobile?: number
  foreground_offset_y_desktop?: number
}

interface Banner extends ForegroundPositioning {
  id: string
  title: string
  subtitle?: string
  badge_text?: string
  image?: string
  image_mobile?: string
  foreground_image?: string
  foreground_image_mobile?: string
  imageUrl?: string
  mobileImageUrl?: string
  foregroundImageUrl?: string
  foregroundImageUrlMobile?: string
  link_url?: string
  button_text?: string
  cta_text?: string
  cta_link?: string
  cta2_text?: string
  cta2_link?: string
}

const FALLBACK_BANNERS: Banner[] = [
  {
    id: '1',
    title: 'ردیاب‌های GPS پیشرفته',
    subtitle: 'راهکارهای حرفه‌ای مدیریت ناوگان با دقت بالا و پوشش سراسری ایران',
    cta_text: 'مشاهده محصولات',
    cta_link: '/products',
    cta2_text: 'مشاوره رایگان',
    cta2_link: '/contact',
  },
  {
    id: '2',
    title: 'نرم‌افزار مای فرزام',
    subtitle: 'پنل مدیریتی قدرتمند با گزارش‌دهی لحظه‌ای و هشدارهای هوشمند',
    cta_text: 'درباره مای فرزام',
    cta_link: '/software',
    cta2_text: 'درخواست دمو',
    cta2_link: '/contact',
  },
  {
    id: '3',
    title: 'امنیت خودرو، آرامش خاطر',
    subtitle: 'با سیستم ردیابی هوشمند، همیشه و همه‌جا خودروی خود را تحت کنترل داشته باشید',
    cta_text: 'شروع کنید',
    cta_link: '/products',
    cta2_text: 'تماس با ما',
    cta2_link: '/contact',
  },
]

const TRUST_METRICS = [
  { icon: Users, value: '۵,۰۰۰+', label: 'مشتری فعال' },
  { icon: RadioIcon, value: '۲۵,۰۰۰+', label: 'دستگاه نصب‌شده' },
  { icon: Trophy, value: '۱۲', label: 'سال تجربه' },
]

interface HeroSliderProps {
  banners?: Banner[]
}

const AUTOPLAY_MS = 7000

/* ── Easing ── */
const EASE_SETTLE = [0.16, 1, 0.3, 1] as const

function TypewriterText({ text, delay = 0, run }: { text: string; delay?: number; run: boolean }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!run || prefersReducedMotion) {
      setDisplayed(text)
      setDone(true)
      return
    }
    setDisplayed('')
    setDone(false)
    let i = 0
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1))
          i++
        } else {
          setDone(true)
          clearInterval(interval)
        }
      }, 40)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timeout)
  }, [text, delay, run, prefersReducedMotion])

  return (
    <span>
      {displayed}
      {!done && (
        <span className="inline-block w-[3px] h-[0.85em] bg-accent mr-1 align-middle rounded-full" style={{ animation: 'blink 1s steps(2) infinite' }} />
      )}
    </span>
  )
}

function getForegroundVars(slide: Banner): React.CSSProperties {
  return {
    '--fg-scale-m': slide.foreground_scale_mobile ?? 0.6,
    '--fg-scale-d': slide.foreground_scale_desktop ?? 0.45,
    '--fg-offset-y-m': `${slide.foreground_offset_y_mobile ?? 0}px`,
    '--fg-offset-y-d': `${slide.foreground_offset_y_desktop ?? 0}px`,
  } as React.CSSProperties
}

export default function HeroSlider({ banners }: HeroSliderProps) {
  const slides = banners && banners.length > 0 ? banners : FALLBACK_BANNERS
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({})
  const [hasTyped, setHasTyped] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { margin: '-100px' })
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const bgParallax = useTransform(scrollYProgress, [0, 1], [0, 80])

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), [slides.length])
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), [slides.length])

  useEffect(() => {
    if (paused || !inView || shouldReduceMotion) return
    const id = setInterval(next, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, next, inView, shouldReduceMotion])

  useEffect(() => {
    const t = setTimeout(() => setHasTyped(true), 100)
    return () => clearTimeout(t)
  }, [])

  const slide = slides[current]
  const hasImage = !!slide.imageUrl && !imgErrors[slide.id]
  const hasForeground = !!slide.foregroundImageUrl

  const handleDragEnd = (_e: unknown, info: { offset: { x: number } }) => {
    const threshold = 80
    if (info.offset.x < -threshold) next()
    else if (info.offset.x > threshold) prev()
  }

  const m = (props: Record<string, unknown>) => shouldReduceMotion ? {} : props

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden min-h-[70vh] md:min-h-[88vh] flex items-stretch md:items-center hero-bleed"
      style={{
        marginTop: 'calc(-1 * var(--navbar-height, 76px))',
        paddingTop: 'var(--navbar-height, 76px)',
        ...getForegroundVars(slide),
      }}
      aria-roledescription="carousel"
      aria-label="اسلایدر اصلی"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* ── 1. Background: banner image ── */}
      {hasImage && (
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id + '-bg'}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: EASE_SETTLE }}
              style={{ y: bgParallax }}
            >
              <Image
                src={slide.imageUrl!}
                alt={slide.title || 'اسلایدر آتی فرزام'}
                fill
                className="object-cover hidden md:block"
                priority
                sizes="100vw"
                onError={() => setImgErrors((prev) => ({ ...prev, [slide.id]: true }))}
              />
              <Image
                src={slide.mobileImageUrl || slide.imageUrl!}
                alt={slide.title || 'اسلایدر آتی فرزام'}
                fill
                className="object-cover md:hidden"
                priority
                sizes="100vw"
                onError={() => setImgErrors((prev) => ({ ...prev, [slide.id]: true }))}
              />
            </motion.div>
          </AnimatePresence>
          {/* Gradient overlays — softer, more cinematic */}
          <div className="absolute inset-0 bg-gradient-to-l from-white/10 via-white/45 to-white/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-white/20" />
          <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-white/90 to-transparent" />
        </div>
      )}

      {/* ── 1b. Background: decorative (no image) ── */}
      {!hasImage && (
        <>
          {/* Base */}
          <div className="absolute inset-0 bg-gradient-to-b from-light-tint-2 via-white to-white" />

          {/* Animated gradient orbs */}
          {!shouldReduceMotion && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
              <motion.div
                className="absolute -top-20 -right-20 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:-top-40 md:-right-40 md:w-[600px] md:h-[600px] rounded-full opacity-[0.08]"
                style={{ background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)' }}
                animate={{ scale: [1, 1.15, 1], x: [0, 25, 0], y: [0, -20, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute -bottom-24 -left-24 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] md:-bottom-48 md:-left-48 md:w-[700px] md:h-[700px] rounded-full opacity-[0.06]"
                style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
                animate={{ scale: [1, 1.1, 1], x: [0, -20, 0], y: [0, 25, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
              />
              <motion.div
                className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] rounded-full opacity-[0.04]"
                style={{ background: 'radial-gradient(circle, var(--primary) 0%, transparent 60%)' }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
              />
            </div>
          )}

          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            aria-hidden="true"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(59,90,128,0.15) 1px, transparent 0)',
              backgroundSize: '28px 28px',
            }}
          />

          {/* Large blurred shapes */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] opacity-20 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(20,184,166,0.3), transparent 70%)',
              borderRadius: '60% 40% 70% 30% / 40% 60% 30% 70%',
              filter: 'blur(100px)',
            }}
          />
          <div
            className="absolute top-1/4 right-1/5 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] opacity-12 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(59,90,128,0.25), transparent 70%)',
              borderRadius: '40% 60% 30% 70% / 60% 40% 70% 30%',
              filter: 'blur(120px)',
            }}
          />
        </>
      )}

      {/* ── 2. Foreground image — desktop ── */}
      {hasForeground && (
        <div
          className="hidden md:block absolute bottom-0 left-0 z-[5] pointer-events-none"
          style={{
            width: 'calc(var(--fg-scale-d, 0.45) * 100%)',
            maxHeight: 'calc(100% - var(--navbar-height, 76px))',
            transform: 'translateY(var(--fg-offset-y-d, 0px))',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id + '-fg'}
              className="relative w-full"
              initial={{ opacity: 0, x: -50, filter: 'blur(8px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: EASE_SETTLE }}
            >
              <Image
                src={slide.foregroundImageUrl!}
                alt={slide.title || 'تصویر اسلایدر'}
                width={800}
                height={800}
                className="w-full h-auto object-contain drop-shadow-2xl"
                sizes="(max-width: 1024px) 45vw, 35vw"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* ── 3. Navigation arrows — hidden on mobile (swipe gestures supported) ── */}
      <motion.button
        onClick={prev}
        {...m({ whileHover: { scale: 1.1 }, whileTap: { scale: 0.92 } })}
        className="hidden sm:flex absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/60 items-center justify-center text-text-secondary hover:text-primary hover:bg-white hover:border-primary/20 transition-all duration-300 z-30"
        style={{ boxShadow: '0 2px 10px rgba(59,90,128,0.06)' }}
        aria-label="اسلاید قبلی"
      >
        <ChevronLeft className="w-5 h-5" />
      </motion.button>
      <motion.button
        onClick={next}
        {...m({ whileHover: { scale: 1.1 }, whileTap: { scale: 0.92 } })}
        className="hidden sm:flex absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/60 items-center justify-center text-text-secondary hover:text-primary hover:bg-white hover:border-primary/20 transition-all duration-300 z-20"
        style={{ boxShadow: '0 2px 10px rgba(59,90,128,0.06)' }}
        aria-label="اسلاید بعدی"
      >
        <ChevronRight className="w-5 h-5" />
      </motion.button>

      {/* ── 4. Content ── */}
      <motion.div
        className={`relative max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-10 z-10 w-full ${hasForeground ? 'md:pr-[calc(var(--fg-scale-d,0.45)*100%+2rem)]' : ''}`}
        style={{ opacity: opacityFade }}
      >
        <div className={`h-full flex flex-col ${hasForeground ? 'md:items-start md:justify-center' : 'md:items-center md:justify-center'} py-6 md:py-16`}>
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="w-full cursor-grab active:cursor-grabbing flex flex-col flex-1"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                aria-live="polite"
                aria-atomic="true"
                className="w-full flex flex-col flex-1"
              >
                <div className={`mt-auto md:mt-0 ${hasForeground ? 'md:ml-auto max-w-2xl' : 'max-w-2xl md:mx-auto'}`}>

                  {/* ── Eyebrow badge ── */}
                  <motion.div
                    {...m({ initial: { opacity: 0, y: -16 }, animate: { opacity: 1, y: 0 } })}
                    transition={{ delay: 0.1, duration: 0.6, ease: EASE_SETTLE }}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 md:px-4 md:py-2 rounded-full mb-4 md:mb-7"
                    style={{
                      background: 'linear-gradient(135deg, rgba(20,184,166,0.08), rgba(20,184,166,0.04))',
                      border: '1px solid rgba(20,184,166,0.15)',
                      boxShadow: '0 0 20px rgba(20,184,166,0.06)',
                    }}
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-50" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                    </span>
                    <span className="text-xs font-semibold text-accent-dark tracking-wide">
                      {slide.badge_text || 'سیگنال فعال — پوشش سراسری ایران'}
                    </span>
                  </motion.div>

                  {/* ── Title ── */}
                  <motion.h1
                    {...m({ initial: { opacity: 0, y: 32, scale: 0.96 }, animate: { opacity: 1, y: 0, scale: 1 } })}
                    transition={{ delay: 0.2, duration: 0.8, ease: EASE_SETTLE }}
                    className="text-[clamp(1.75rem,7vw,3rem)] md:text-[clamp(2rem,4vw,3rem)] font-bold md:font-semibold text-dark leading-[1.2] md:leading-[1.3] mb-3 md:mb-6"
                    style={{ textWrap: 'balance' }}
                  >
                    <TypewriterText text={slide.title} delay={300} run={!hasTyped} />
                  </motion.h1>

                  {/* ── Subtitle ── */}
                  {slide.subtitle && (
                    <motion.p
                      {...m({ initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 } })}
                      transition={{ delay: 0.45, duration: 0.6, ease: EASE_SETTLE }}
                      className="text-text-muted text-sm md:text-lg lg:text-xl leading-[1.7] md:leading-[1.8] mb-5 md:mb-10 max-w-xl"
                    >
                      {slide.subtitle}
                    </motion.p>
                  )}

                  {/* ── CTA Buttons ── */}
                  <motion.div
                    {...m({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } })}
                    transition={{ delay: 0.6, duration: 0.6, ease: EASE_SETTLE }}
                    className="flex gap-2.5 md:gap-4 flex-wrap items-center mb-5 md:mb-10"
                  >
                    {slide.cta_link && (
                      <Link href={slide.cta_link} className="flex-1 sm:flex-none">
                        <Button
                          size="lg"
                          className="group/btn relative bg-primary text-white font-semibold hover:bg-primary-dark w-full sm:w-auto px-6 md:px-10 py-3 md:py-4 rounded-xl text-sm md:text-base transition-all duration-300 shadow-[0_4px_14px_rgba(59,90,128,0.12)] hover:shadow-[0_6px_20px_rgba(59,90,128,0.18)]"
                        >
                          <span className="flex items-center gap-2">
                            {slide.cta_text ?? 'مشاهده'}
                            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover/btn:-translate-x-1.5" />
                          </span>
                        </Button>
                      </Link>
                    )}
                    {slide.cta2_link && (
                      <Link href={slide.cta2_link} className="flex-1 sm:flex-none">
                        <Button
                          variant="outline"
                          size="lg"
                          className="text-primary font-medium w-full sm:w-auto px-5 md:px-7 py-3 md:py-4 rounded-xl border-2 border-primary/12 hover:border-primary/30 hover:bg-primary/5 text-sm md:text-base transition-all duration-300"
                        >
                          {slide.cta2_text ?? 'بیشتر بدانید'}
                        </Button>
                      </Link>
                    )}
                  </motion.div>

                  {/* ── Trust strip ── */}
                  <motion.div
                    {...m({ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } })}
                    transition={{ delay: 0.8, duration: 0.6, ease: EASE_SETTLE }}
                    className="flex gap-2 md:gap-4 items-stretch overflow-x-auto scrollbar-none pb-1"
                  >
                    {TRUST_METRICS.map((metric, i) => (
                      <motion.div
                        key={metric.label}
                        {...m({ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } })}
                        transition={{ delay: 0.9 + i * 0.08, duration: 0.5, ease: EASE_SETTLE }}
                        className="group flex items-center gap-2.5 md:gap-3 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2.5 md:px-4 md:py-3 border border-border-soft hover:border-primary/10 transition-all duration-300 cursor-default shrink-0"
                        style={{ boxShadow: '0 1px 4px rgba(59,90,128,0.04), 0 2px 10px rgba(59,90,128,0.03)' }}
                      >
                        <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg md:rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center shrink-0">
                          <metric.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent" />
                        </div>
                        <div className="whitespace-nowrap">
                          <p className="text-xs md:text-sm font-semibold text-dark leading-none">{metric.value}</p>
                          <p className="text-[10px] md:text-xs text-text-muted mt-0.5">{metric.label}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* ── Micro trust — hidden on mobile ── */}
                  <motion.div
                    {...m({ initial: { opacity: 0 }, animate: { opacity: 1 } })}
                    transition={{ delay: 1.1, duration: 0.5 }}
                    className="hidden md:flex items-center gap-4 mt-5 text-xs text-text-muted"
                  >
                    <span className="flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-accent" />
                      گارانتی معتبر
                    </span>
                    <span className="w-px h-3 bg-border-soft" />
                    <span className="flex items-center gap-1.5">
                      <Headset className="w-3.5 h-3.5 text-accent" />
                      پشتیبانی ۲۴/۷
                    </span>
                  </motion.div>
                </div>

                {/* ── Foreground image — mobile ── */}
                {hasForeground && (
                  <div
                    className="md:hidden flex-shrink-0 order-[-1] pt-2 pb-1 mx-auto"
                    style={{
                      width: 'calc(var(--fg-scale-m, 0.6) * 100%)',
                      transform: 'translateY(var(--fg-offset-y-m, 0px))',
                    }}
                  >
                    <Image
                      src={slide.foregroundImageUrlMobile || slide.foregroundImageUrl!}
                      alt={slide.title || 'تصویر اسلایدر'}
                      width={600}
                      height={600}
                      className="w-full h-auto max-h-[40vh] object-contain object-bottom drop-shadow-2xl"
                      sizes="60vw"
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>

      {/* ── 5. Slide indicators ── */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1.5 md:gap-2 z-10" role="tablist" aria-label="اسلایدها">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={`اسلاید ${i + 1}`}
            className="relative flex items-center justify-center h-10 md:h-8 px-0.5 md:px-1 group"
          >
            <div
              className={`h-[5px] md:h-[6px] rounded-full overflow-hidden transition-all duration-500 ${
                i === current
                  ? 'w-8 md:w-10 bg-primary/20'
                  : 'w-[5px] md:w-[6px] bg-border-base/50 group-hover:bg-border-base'
              }`}
            >
              {i === current && !paused && inView && (
                <motion.div
                  key={`progress-${current}`}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Blink keyframe for typewriter cursor */}
      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  )
}
