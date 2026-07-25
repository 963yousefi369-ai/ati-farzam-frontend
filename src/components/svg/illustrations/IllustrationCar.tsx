/** Isometric car illustration — 2.5D minimal, soft cyan gradients, navy accents */
export default function IllustrationCar({ className = 'w-full h-full' }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="car-body" x1="60" y1="60" x2="180" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E8F8F6" />
          <stop offset="100%" stopColor="#B2DFDB" />
        </linearGradient>
        <linearGradient id="car-roof" x1="90" y1="50" x2="150" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0e7490" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0e7490" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="car-shadow" x1="120" y1="170" x2="120" y2="185" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#1e3a5f" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="120" cy="175" rx="80" ry="10" fill="url(#car-shadow)" />

      {/* Car body - isometric base */}
      <path
        d="M50 130 L60 100 L100 85 L180 85 L190 100 L195 130 Z"
        fill="url(#car-body)"
        stroke="#1e3a5f"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Car roof */}
      <path
        d="M80 100 L90 70 L155 70 L165 100 Z"
        fill="url(#car-roof)"
        stroke="#1e3a5f"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Windows */}
      <path
        d="M90 95 L95 75 L120 75 L120 95 Z"
        fill="white"
        stroke="#1e3a5f"
        strokeWidth="1"
        strokeLinejoin="round"
        opacity="0.8"
      />
      <path
        d="M125 95 L125 75 L150 75 L155 95 Z"
        fill="white"
        stroke="#1e3a5f"
        strokeWidth="1"
        strokeLinejoin="round"
        opacity="0.8"
      />

      {/* Front wheel */}
      <circle cx="80" cy="140" r="16" fill="white" stroke="#1e3a5f" strokeWidth="1.5" />
      <circle cx="80" cy="140" r="8" fill="#1e3a5f" opacity="0.15" />
      <circle cx="80" cy="140" r="3" fill="#1e3a5f" opacity="0.3" />

      {/* Rear wheel */}
      <circle cx="165" cy="140" r="16" fill="white" stroke="#1e3a5f" strokeWidth="1.5" />
      <circle cx="165" cy="140" r="8" fill="#1e3a5f" opacity="0.15" />
      <circle cx="165" cy="140" r="3" fill="#1e3a5f" opacity="0.3" />

      {/* GPS signal waves */}
      <path d="M120 55 Q130 45 140 55" stroke="#0e7490" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M115 45 Q130 30 145 45" stroke="#0e7490" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" />
      <path d="M110 35 Q130 15 150 35" stroke="#0e7490" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.2" />

      {/* GPS dot */}
      <circle cx="130" cy="55" r="4" fill="#0e7490" />
      <circle cx="130" cy="55" r="2" fill="white" />

      {/* Headlights */}
      <ellipse cx="60" cy="115" rx="4" ry="6" fill="#0e7490" opacity="0.4" />
      <ellipse cx="190" cy="115" rx="4" ry="6" fill="#0e7490" opacity="0.4" />
    </svg>
  )
}

