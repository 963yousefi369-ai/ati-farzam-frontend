/** PartnerLogo — Generic grayscale partner logo placeholder */
export default function PartnerLogo({ name, className = 'w-full h-8' }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={name}>
      <rect x="2" y="2" width="116" height="36" rx="8" fill="var(--light-tint)" stroke="#1e3a5f" strokeWidth="0.5" strokeOpacity="0.15" />
      <text
        x="60"
        y="24"
        textAnchor="middle"
        fill="#1e3a5f"
        fontSize="10"
        fontFamily="Vazirmatn, sans-serif"
        opacity="0.5"
      >
        {name}
      </text>
    </svg>
  )
}

