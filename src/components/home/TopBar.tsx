/** TopBar — Slim utility bar with free shipping and support info */
import { Phone, Truck } from 'lucide-react'
import { landingData } from '@/data/landing'

export default function TopBar() {
  const { utilityBar } = landingData

  return (
    <div className="hidden lg:block bg-dark text-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-9 flex items-center justify-between text-xs">
        {/* Right (start in RTL) */}
        <div className="flex items-center gap-2 opacity-90">
          <Truck className="w-3.5 h-3.5 opacity-70" />
          <span>{utilityBar.freeShipping}</span>
        </div>
        {/* Left (end in RTL) */}
        <div className="flex items-center gap-4 opacity-90">
          <span className="flex items-center gap-1.5">
            <span>{utilityBar.support}</span>
          </span>
          <span className="opacity-20">|</span>
          <a
            href={`tel:${utilityBar.phoneRaw}`}
            className="flex items-center gap-1.5 hover:opacity-100 transition-opacity"
            dir="ltr"
          >
            <span>{utilityBar.phone}</span>
            <Phone className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>
      </div>
    </div>
  )
}
