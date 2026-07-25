'use client'
import Link from 'next/link'
import Image from 'next/image'
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

  return (
    <div className="bg-dark rounded-3xl overflow-hidden relative">
      {/* World map dot pattern background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="worldDots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="0.8" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#worldDots)" />
        </svg>
        {/* Fine grid lines */}
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

      <div className="relative p-8 lg:p-12 xl:p-16">
        <div className="flex flex-col xl:flex-row items-center gap-10 xl:gap-16">

          {/* ── Right: Text (RTL) ── */}
          <div className="flex-1 text-center xl:text-right order-2 xl:order-1">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 leading-tight">
              {platform.heading}
            </h2>
            <p className="text-base lg:text-lg text-white/80 leading-relaxed mb-8 max-w-lg mx-auto xl:mx-0">
              {platform.subtitle}
            </p>

            {/* Feature chips */}
            <div className="flex gap-3 flex-wrap justify-center xl:justify-start mb-10">
              {platform.features.map(({ icon, label }) => {
                const Icon = ICON_MAP[icon] || IconPin
                return (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/15 text-sm font-medium text-white/80 hover:border-accent/40 hover:text-white transition-all"
                  >
                    <Icon className="w-4 h-4 text-accent" />
                    {label}
                  </div>
                )
              })}
            </div>

            {/* CTA */}
            <Link href="/software">
              <Button
                variant="outline"
                size="lg"
                className="group/btn text-white pill px-8 border-white/20 hover:border-accent hover:bg-accent/10 hover:text-accent"
              >
                <span className="flex items-center gap-2">
                  {platform.cta}
                  <IconArrowLeft className="w-4 h-4 transition-transform duration-base group-hover/btn:-translate-x-1" />
                </span>
              </Button>
            </Link>
          </div>

          {/* ── Left: Dashboard Mockup ── */}
          <div className="order-1 xl:order-2 w-full xl:w-[560px] shrink-0">
            {softwareImage ? (
              <Image
                src={djangoImageUrl(softwareImage)}
                alt="پلتفرم ردیابی هوشمند"
                width={560}
                height={420}
                className="w-full h-auto rounded-xl"
                loading="lazy"
              />
            ) : (
              <DashboardMockup className="w-full h-auto" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
