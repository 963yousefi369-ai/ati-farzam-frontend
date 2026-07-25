/** Icon set for landing page — line/duotone style in design system colors */

interface IconProps {
  className?: string
  size?: number
}

export function IconCart({ className = 'w-5 h-5', size }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size}>
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
    </svg>
  )
}

export function IconUser({ className = 'w-5 h-5', size }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size}>
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

export function IconSearch({ className = 'w-5 h-5', size }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

export function IconHeadset({ className = 'w-5 h-5', size }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} width={size} height={size}>
      <path d="M3 18v-6a9 9 0 0118 0v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v5zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v5z" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

export function IconShield({ className = 'w-5 h-5', size }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} width={size} height={size}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" opacity="0.08" />
    </svg>
  )
}

export function IconPin({ className = 'w-5 h-5', size }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} width={size} height={size}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.15" />
    </svg>
  )
}

export function IconSpeedometer({ className = 'w-5 h-5', size }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} width={size} height={size}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.05" />
      <path d="M12 6v2M6 12H4M20 12h-2M7.76 7.76l1.42 1.42M16.24 7.76l-1.42 1.42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 12l3-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  )
}

export function IconTruck({ className = 'w-5 h-5', size }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size}>
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  )
}

export function IconMotorcycle({ className = 'w-5 h-5', size }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size}>
      <circle cx="5" cy="18" r="3" />
      <circle cx="19" cy="18" r="3" />
      <path d="M12 4l-3 8h6l-1 4H8" />
      <path d="M15 4h4l2 4h-4" />
    </svg>
  )
}

export function IconCar({ className = 'w-5 h-5', size }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size}>
      <path d="M5 17h14M5 17a2 2 0 01-2-2V9a2 2 0 012-2h1l2-3h8l2 3h1a2 2 0 012 2v6a2 2 0 01-2 2M5 17l-1 2h2M19 17l1 2h-2" />
      <circle cx="7.5" cy="14.5" r="1.5" />
      <circle cx="16.5" cy="14.5" r="1.5" />
    </svg>
  )
}

export function IconChart({ className = 'w-5 h-5', size }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size}>
      <path d="M18 20V10M12 20V4M6 20v-6" />
    </svg>
  )
}

export function IconPhone({ className = 'w-5 h-5', size }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size}>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  )
}

export function IconMail({ className = 'w-5 h-5', size }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 4L12 13 2 4" />
    </svg>
  )
}

export function IconLocation({ className = 'w-5 h-5', size }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} width={size} height={size}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function IconRoute({ className = 'w-5 h-5', size }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} width={size} height={size}>
      <path d="M3 17c0-3 3-5 6-5s4-3 4-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="3" cy="17" r="2" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1" />
      <circle cx="21" cy="7" r="2" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1" />
      <path d="M21 7c0 3-3 5-6 5s-4 3-4 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeDasharray="3 3" />
    </svg>
  )
}

export function IconArrowLeft({ className = 'w-5 h-5', size }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size}>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  )
}

export function IconStar({ className = 'w-4 h-4', size }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} width={size} height={size}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

/* ── Social Icons ── */

export function IconInstagram({ className = 'w-5 h-5', size }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
    </svg>
  )
}

export function IconTelegram({ className = 'w-5 h-5', size }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} width={size} height={size}>
      <path d="M21 3L9 13l-2 7 4-4 8-10z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.1" />
      <path d="M21 3L9 13l-2 7 4-4 8-10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 13l-4 7 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconLinkedin({ className = 'w-5 h-5', size }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size}>
      <rect x="2" y="2" width="20" height="20" rx="3" />
      <line x1="8" y1="11" x2="8" y2="17" />
      <line x1="8" y1="7" x2="8" y2="7.01" />
      <path d="M12 17v-4c0-2 1-3 3-3s3 1 3 3v4" />
    </svg>
  )
}

export function IconTwitter({ className = 'w-5 h-5', size }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size}>
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
    </svg>
  )
}

export function IconYoutube({ className = 'w-5 h-5', size }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size}>
      <rect x="2" y="4" width="20" height="16" rx="4" />
      <polygon points="10,8 16,12 10,16" fill="currentColor" opacity="0.3" />
      <polygon points="10,8 16,12 10,16" />
    </svg>
  )
}

export function IconChevronUp({ className = 'w-5 h-5', size }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} width={size} height={size}>
      <polyline points="18 15 12 9 6 15" />
    </svg>
  )
}
