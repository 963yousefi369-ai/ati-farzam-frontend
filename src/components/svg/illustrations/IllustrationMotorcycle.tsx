/** Isometric motorcycle illustration — 2.5D minimal, soft cyan gradients, navy accents */
export default function IllustrationMotorcycle({ className = 'w-full h-full' }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="moto-body" x1="60" y1="60" x2="180" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E8F8F6" />
          <stop offset="100%" stopColor="#B2DFDB" />
        </linearGradient>
        <linearGradient id="moto-tank" x1="100" y1="70" x2="150" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0e7490" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0e7490" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="moto-shadow" x1="120" y1="170" x2="120" y2="185" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#1e3a5f" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="120" cy="175" rx="75" ry="10" fill="url(#moto-shadow)" />

      {/* Rear wheel */}
      <circle cx="70" cy="145" r="25" fill="white" stroke="#1e3a5f" strokeWidth="1.5" />
      <circle cx="70" cy="145" r="15" fill="#1e3a5f" opacity="0.08" />
      <circle cx="70" cy="145" r="5" fill="#1e3a5f" opacity="0.2" />
      {/* Wheel spokes */}
      <line x1="70" y1="125" x2="70" y2="165" stroke="#1e3a5f" strokeWidth="0.5" opacity="0.15" />
      <line x1="50" y1="145" x2="90" y2="145" stroke="#1e3a5f" strokeWidth="0.5" opacity="0.15" />

      {/* Front wheel */}
      <circle cx="170" cy="145" r="22" fill="white" stroke="#1e3a5f" strokeWidth="1.5" />
      <circle cx="170" cy="145" r="13" fill="#1e3a5f" opacity="0.08" />
      <circle cx="170" cy="145" r="4" fill="#1e3a5f" opacity="0.2" />
      {/* Wheel spokes */}
      <line x1="170" y1="127" x2="170" y2="163" stroke="#1e3a5f" strokeWidth="0.5" opacity="0.15" />
      <line x1="152" y1="145" x2="188" y2="145" stroke="#1e3a5f" strokeWidth="0.5" opacity="0.15" />

      {/* Frame */}
      <path
        d="M70 145 L100 100 L160 95 L170 145"
        fill="none"
        stroke="#1e3a5f"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Tank */}
      <path
        d="M95 100 Q110 75 135 80 Q150 85 155 95 L140 100 L100 100 Z"
        fill="url(#moto-tank)"
        stroke="#1e3a5f"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Seat */}
      <path
        d="M85 100 L100 90 L120 90 L115 100 Z"
        fill="url(#moto-body)"
        stroke="#1e3a5f"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Handlebar */}
      <path
        d="M155 90 L165 80 L175 85"
        fill="none"
        stroke="#1e3a5f"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="175" cy="85" r="3" fill="#1e3a5f" opacity="0.2" />

      {/* Front fork */}
      <path
        d="M160 95 L170 125"
        fill="none"
        stroke="#1e3a5f"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Headlight */}
      <circle cx="172" cy="100" r="5" fill="white" stroke="#1e3a5f" strokeWidth="1" />
      <circle cx="172" cy="100" r="2.5" fill="#0e7490" opacity="0.4" />

      {/* Tail light */}
      <rect x="65" y="105" width="8" height="5" rx="2" fill="#0e7490" opacity="0.4" stroke="#1e3a5f" strokeWidth="1" />

      {/* GPS tracker - small device */}
      <rect x="95" y="110" width="12" height="8" rx="2" fill="white" stroke="#0e7490" strokeWidth="1.5" />
      <circle cx="101" cy="114" r="2" fill="#0e7490" />

      {/* GPS signal waves */}
      <path d="M101 100 Q108 90 115 100" stroke="#0e7490" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M98 92 Q108 80 118 92" stroke="#0e7490" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" />
      <path d="M95 84 Q108 70 121 84" stroke="#0e7490" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.15" />

      {/* Speed lines */}
      <line x1="35" y1="130" x2="50" y2="130" stroke="#0e7490" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      <line x1="30" y1="140" x2="48" y2="140" stroke="#0e7490" strokeWidth="1" strokeLinecap="round" opacity="0.2" />
      <line x1="35" y1="150" x2="50" y2="150" stroke="#0e7490" strokeWidth="1" strokeLinecap="round" opacity="0.15" />

      {/* Exhaust pipe */}
      <path
        d="M70 130 L55 135 L50 135"
        fill="none"
        stroke="#1e3a5f"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  )
}

