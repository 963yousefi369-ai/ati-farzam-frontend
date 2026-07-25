'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { landingData } from '@/data/landing'
import { djangoImageUrl } from '@/lib/api/django'
import { useSiteSettings } from '@/lib/store/site-settings'
import { DashboardMockup, IconPin, IconShield, IconChart, IconRoute, IconArrowLeft } from '@/components/svg'

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  pin: IconPin,
  shield: IconShield,
  chart: IconChart,
  route: IconRoute,
}

export default function PlatformShowcase() {
  const { platform } = landingData
  const { softwareImage } = useSiteSettings()
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="relative rounded-3xl overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-deeper to-dark" />
      
      {/* World map dot pattern */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="worldDots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="0.8" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#worldDots)" />
        </svg>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="gridLines" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="60" y2="0" stroke="white" strokeWidth="0.3" />
              <line x1="0" y1="0" x2="0" y2="60" stroke="white" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridLines)" />
        </svg>
      </div>

      {/* Animated glow */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <motion.div
            className="absolute top-1/2 left-1/3 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.08]"
            style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      )}

      <div className="relative p-5 sm:p-8 lg:p-12 xl:p-16">
        <div className="flex flex-col xl:flex-row items-center gap-10 xl:gap-16">

          {/* ── Right: Text (RTL) ── */}
          <div className="flex-1 text-center xl:text-right order-2 xl:order-1">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] border border-white/10 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-medium text-white/70">پلتفرم اختصاصی</span>
            </motion.div>

            <motion.h2
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl lg:text-4xl xl:text-5xl font-semibold text-white mb-4 leading-tight"
            >
              {platform.heading}
            </motion.h2>

            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base lg:text-lg text-white/70 leading-relaxed mb-8 max-w-lg mx-auto xl:mx-0"
            >
              {platform.subtitle}
            </motion.p>

            {/* Feature chips */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex gap-3 flex-wrap justify-center xl:justify-start mb-10"
            >
              {platform.features.map(({ icon, label }) => {
                const Icon = ICON_MAP[icon] || IconPin
                return (
                  <div
                    key={label}
                    className="group flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.12] text-sm font-medium text-white/75 hover:border-accent/30 hover:text-white hover:bg-white/[0.05] transition-all duration-300"
                  >
                    <Icon className="w-4 h-4 text-accent group-hover:text-accent-light transition-colors" />
                    {label}
                  </div>
                )
              })}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="/software">
                <Button
                  variant="outline"
                  size="lg"
                  className="group/btn text-white pill px-8 border-white/15 hover:border-accent hover:bg-accent/10 hover:text-accent transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    {platform.cta}
                    <IconArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover/btn:-translate-x-1.5" />
                  </span>
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* ── Left: Dashboard Mockup ── */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -30, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 xl:order-2 w-full xl:w-[560px] shrink-0"
          >
            {softwareImage ? (
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Image
                  src={djangoImageUrl(softwareImage)}
                  alt="پلتفرم ردیابی هوشمند"
                  width={560}
                  height={420}
                  className="relative w-full h-auto rounded-xl shadow-2xl"
                  loading="lazy"
                />
              </div>
            ) : (
              <DashboardMockup className="w-full h-auto" />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
