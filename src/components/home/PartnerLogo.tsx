'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface PartnerLogoProps {
  name: string
  logo?: string | null
  className?: string
}

/**
 * Renders a partner logo, degrading to a clean wordmark when the image is
 * missing or fails to load.
 *
 * This replaces the broken-image icons that were visible in the "مشتریان ما"
 * section: a grey wordmark reads as intentional design, a broken image reads as
 * a broken website.
 */
export default function PartnerLogo({ name, logo, className }: PartnerLogoProps) {
  const [failed, setFailed] = useState(false)
  const showImage = Boolean(logo) && !failed

  return (
    <div
      className={cn(
        'flex h-16 w-full items-center justify-center px-6 grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100',
        className,
      )}
    >
      {showImage ? (
        <Image
          src={logo as string}
          alt={name}
          width={140}
          height={48}
          className="h-10 w-auto max-w-[140px] object-contain"
          onError={() => setFailed(true)}
          unoptimized
        />
      ) : (
        <span className="whitespace-nowrap text-sm font-semibold tracking-tight text-slate-500">
          {name}
        </span>
      )}
    </div>
  )
}
