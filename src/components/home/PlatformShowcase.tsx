import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, BarChart3, MapPin, Route, ShieldCheck } from 'lucide-react'
import { landingData } from '@/data/landing'
import { djangoImageUrl } from '@/lib/api/django'
import { useSiteSettings } from '@/lib/store/site-settings'
import { DashboardMockup } from '@/components/svg'

const ICONS = { pin: MapPin, shield: ShieldCheck, chart: BarChart3, route: Route } as const

export default function PlatformShowcase() {
  const { platform } = landingData
  const { softwareImage } = useSiteSettings()

  return (
    <section className="overflow-hidden rounded-3xl bg-dark text-white">
      <div className="grid items-center gap-10 p-6 sm:p-8 lg:grid-cols-[minmax(0,.85fr)_minmax(420px,1.15fr)] lg:gap-14 lg:p-12">
        <div>
          <p className="mb-4 flex items-center gap-2 text-sm font-medium text-accent"><span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />پلتفرم اختصاصی آتی فرزام</p>
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">{platform.heading}</h2>
          <p className="mt-5 max-w-[58ch] text-base leading-8 text-white/75">{platform.subtitle}</p>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {platform.features.map(({ icon, label }) => {
              const Icon = ICONS[icon as keyof typeof ICONS] || MapPin
              return <li key={label} className="flex min-h-12 items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white/85"><Icon className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />{label}</li>
            })}
          </ul>

          <Link href="/software" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-xl bg-accent px-6 text-sm font-semibold text-dark transition-colors hover:bg-accent-light">
            {platform.cta}<ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-dark-deeper">
          {softwareImage ? <Image src={djangoImageUrl(softwareImage)} alt="نمای پلتفرم ردیابی آتی فرزام" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" /> : <div className="flex h-full items-center justify-center p-4"><DashboardMockup className="h-auto w-full" /></div>}
        </div>
      </div>
    </section>
  )
}
