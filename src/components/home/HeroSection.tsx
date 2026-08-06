'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useReducedMotion, motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { landingData } from '@/data/landing'
import { djangoImageUrl } from '@/lib/api/django'
import { useSiteSettings } from '@/lib/store/site-settings'
import { HeroRadarMap, ProductPlaceholder } from '@/components/svg'
import { IconArrowLeft, IconSpeedometer, IconPin, IconChart, IconHeadset, IconShield, IconUser } from '@/components/svg/Icons'
import { IconTile } from '@/components/ui/IconTile'

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  speedometer: IconSpeedometer,
  pin: IconPin,
  chart: IconChart,
  headset: IconHeadset,
  shield: IconShield,
  users: IconUser,
}

interface Banner {
  id: number
  title: string
  subtitle?: string
  image?: string | null
  link?: string
  cta_text?: string
  cta_link?: string
  cta2_text?: string
  cta2_link?: string
}

interface HeroSectionProps {
  heroTitle?: string | null
  heroText?: string | null
  banners?: Banner[]
}

const MODEL_DEFAULTS = ['Welcome to our store', 'Best products at best prices.']

export default function HeroSection({ heroTitle, heroText, banners }: HeroSectionProps = {}) {
  const { hero: defaultHero, heroStats } = landingData
  const settings = useSiteSettings()
  const prefersReducedMotion = useReducedMotion()
  const apiTitle = settings.heroTitle || heroTitle
  const apiText = settings.heroText || heroText

  const hasBanners = banners && banners.length > 0
  const banner = hasBanners ? banners![0] : null

  const hero = {
    ...defaultHero,
    ...(apiTitle && !MODEL_DEFAULTS.includes(apiTitle) ? { heading1: apiTitle } : {}),
    ...(apiText && !MODEL_DEFAULTS.includes(apiText) ? { subtitle: apiText } : {}),
  }

  const heading = banner?.title || hero.heading1
  const subtitle = banner?.subtitle || hero.subtitle
  const cta1Text = banner?.cta_text || hero.cta1
  const cta1Link = banner?.cta_link || '/products'
  const cta2Text = banner?.cta2_text || hero.cta2
  const cta2Link = banner?.cta2_link || '/about'

  const heroImage = banner?.image
    ? djangoImageUrl(banner.image)
    : settings.heroBgImage || settings.heroBanner
      ? djangoImageUrl(settings.heroBgImage || settings.heroBanner)
      : null

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-light-tint-2 via-white to-white" />
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <motion.div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full opacity-[0.07]" style={{ background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)' }} animate={{ scale: [1, 1.08, 1], x: [0, 20, 0], y: [0, -15, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }} animate={{ scale: [1, 1.06, 1], x: [0, -15, 0], y: [0, 20, 0] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />
        </div>
      )}
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 lg:pt-28 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 text-center lg:text-right w-full">
            <motion.div initial={prefersReducedMotion ? false : { opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-bg-soft border border-border-soft mb-6">
              <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" /><span className="relative inline-flex rounded-full h-2 w-2 bg-accent" /></span>
              <span className="text-xs font-semibold text-accent tracking-wide">پوشش سراسری ایران</span>
            </motion.div>
            <motion.h1 initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.3] mb-6"><span className="text-dark">{heading}</span></motion.h1>
            <motion.p initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }} className="text-text-secondary text-base md:text-lg leading-[1.8] mb-8 max-w-xl mx-auto text-right">{subtitle}</motion.p>
            <motion.div initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }} className="flex gap-3 md:gap-4 flex-wrap justify-center lg:justify-start items-center mb-10">
              <Link href={cta1Link}><Button size="lg" className="group/btn relative bg-primary text-white font-semibold hover:bg-primary-dark pill px-8 py-4 shadow-card hover:shadow-card-hover text-base transition-all duration-300"><span className="flex items-center gap-2">{cta1Text}<IconArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-x-1.5" /></span></Button></Link>
              {cta2Text && <Link href={cta2Link}><Button variant="outline" size="lg" className="text-primary font-medium pill px-7 py-4 border-2 border-primary/15 hover:border-primary/35 hover:bg-primary/5 text-base transition-all duration-300">{cta2Text}</Button></Link>}
            </motion.div>
            <motion.div initial={prefersReducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.7 }} className="flex flex-wrap items-center gap-x-4 gap-y-2 justify-center lg:justify-start text-xs text-text-muted">
              <span className="flex items-center gap-1.5"><IconShield className="h-3.5 w-3.5 text-accent" />گارانتی معتبر</span>
              <span className="w-px h-3 bg-border-soft" />
              <span className="flex items-center gap-1.5"><IconHeadset className="h-3.5 w-3.5 text-accent" />پشتیبانی ۲۴/۷</span>
            </motion.div>
          </div>
          <motion.div initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} className="order-1 lg:order-2 flex items-center justify-center relative min-h-[320px] md:min-h-[480px] lg:min-h-[560px]">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true"><div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-primary/5 to-accent/5 blur-3xl" /></div>
            <div className="relative z-10 w-80 h-80 md:w-[480px] md:h-[480px] lg:w-[560px] lg:h-[560px]">{heroImage ? <Image src={heroImage} alt={banner?.title || 'ردیاب GPS'} fill className="object-contain drop-shadow-2xl" sizes="(max-width: 768px) 320px, (max-width: 1024px) 480px, 560px" priority /> : <ProductPlaceholder className="w-full h-full drop-shadow-2xl" />}</div>
          </motion.div>
        </div>
        <motion.div initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 }} className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-10 max-w-2xl mx-auto">
          {heroStats.map((stat, i) => {
            const Icon = ICON_MAP[stat.icon] || IconShield
            return <motion.div key={stat.label} initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.9 + i * 0.08, ease: [0.16, 1, 0.3, 1] }} className="group flex items-center gap-3 bg-white rounded-2xl px-5 py-3.5 border border-hairline shadow-card hover:shadow-card-hover hover:border-primary/15 transition-all duration-300 cursor-default"><IconTile icon={Icon} /><p className="text-sm font-semibold text-dark">{stat.label}</p></motion.div>
          })}
        </motion.div>
      </div>
    </section>
  )
}
