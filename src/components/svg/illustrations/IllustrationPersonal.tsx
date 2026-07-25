/** Isometric personal tracker illustration — 2.5D minimal, soft cyan gradients, navy accents */
export default function IllustrationPersonal({ className = 'w-full h-full' }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="person-body" x1="100" y1="40" x2="140" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E8F8F6" />
          <stop offset="100%" stopColor="#B2DFDB" />
        </linearGradient>
        <linearGradient id="device-body" x1="140" y1="100" x2="180" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0e7490" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0e7490" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="person-shadow" x1="120" y1="175" x2="120" y2="190" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#1e3a5f" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="120" cy="180" rx="60" ry="8" fill="url(#person-shadow)" />

      {/* Person - simplified isometric */}
      {/* Head */}
      <circle cx="110" cy="65" r="20" fill="url(#person-body)" stroke="#1e3a5f" strokeWidth="1.5" />

      {/* Body */}
      <path
        d="M90 85 L90 140 L130 140 L130 85 Q120 75 110 75 Q100 75 90 85 Z"
        fill="url(#person-body)"
        stroke="#1e3a5f"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Arms */}
      <path
        d="M90 95 L65 120 L70 125 L95 105"
        fill="url(#person-body)"
        stroke="#1e3a5f"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M130 95 L155 115 L150 120 L125 105"
        fill="url(#person-body)"
        stroke="#1e3a5f"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Legs */}
      <path
        d="M95 140 L90 170 L100 170 L105 140"
        fill="url(#person-body)"
        stroke="#1e3a5f"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M115 140 L120 170 L130 170 L125 140"
        fill="url(#person-body)"
        stroke="#1e3a5f"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Tracker device on wrist */}
      <rect x="148" y="112" width="18" height="12" rx="3" fill="url(#device-body)" stroke="#1e3a5f" strokeWidth="1.5" />
      <circle cx="157" cy="118" r="3" fill="#0e7490" opacity="0.6" />
      <circle cx="157" cy="118" r="1.5" fill="white" />

      {/* GPS signal from device */}
      <path d="M165 105 Q172 95 179 105" stroke="#0e7490" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M168 98 Q172 90 176 98" stroke="#0e7490" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" />

      {/* Heart pulse on device */}
      <path d="M152 118 L155 118 L157 114 L159 122 L161 116 L163 118" stroke="#0e7490" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* Floating location pin */}
      <g transform="translate(170, 60)">
        <path d="M0 -15 Q-10 -15 -10 -5 Q-10 5 0 15 Q10 5 10 -5 Q10 -15 0 -15 Z" fill="#0e7490" opacity="0.2" stroke="#0e7490" strokeWidth="1" />
        <circle cx="0" cy="-5" r="4" fill="#0e7490" opacity="0.4" />
        <circle cx="0" cy="-5" r="2" fill="white" />
      </g>

      {/* Safety shield icon */}
      <g transform="translate(55, 70)">
        <path d="M0 -12 L10 -6 L10 6 Q10 14 0 18 Q-10 14 -10 6 L-10 -6 Z" fill="white" stroke="#0e7490" strokeWidth="1.5" />
        <path d="M-4 2 L-1 5 L5 -2" stroke="#0e7490" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </svg>
  )
}

