/** Isometric truck/fleet illustration — 2.5D minimal, soft cyan gradients, navy accents */
export default function IllustrationFleet({ className = 'w-full h-full' }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="truck-body" x1="40" y1="50" x2="200" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E8F8F6" />
          <stop offset="100%" stopColor="#B2DFDB" />
        </linearGradient>
        <linearGradient id="truck-cabin" x1="150" y1="60" x2="200" y2="130" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0e7490" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0e7490" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="truck-cargo" x1="40" y1="60" x2="150" y2="140" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="#f8fafc" />
        </linearGradient>
        <linearGradient id="truck-shadow" x1="120" y1="170" x2="120" y2="190" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#1e3a5f" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="120" cy="178" rx="90" ry="12" fill="url(#truck-shadow)" />

      {/* Cargo container */}
      <rect x="35" y="70" width="110" height="70" rx="6" fill="url(#truck-cargo)" stroke="#1e3a5f" strokeWidth="1.5" />

      {/* Container details - vertical lines */}
      <line x1="65" y1="75" x2="65" y2="135" stroke="#1e3a5f" strokeWidth="0.5" opacity="0.1" />
      <line x1="95" y1="75" x2="95" y2="135" stroke="#1e3a5f" strokeWidth="0.5" opacity="0.1" />
      <line x1="125" y1="75" x2="125" y2="135" stroke="#1e3a5f" strokeWidth="0.5" opacity="0.1" />

      {/* Container top edge */}
      <path d="M35 70 L45 60 L155 60 L145 70" fill="url(#truck-body)" stroke="#1e3a5f" strokeWidth="1.5" strokeLinejoin="round" />

      {/* Cabin */}
      <path
        d="M145 80 L145 140 L200 140 L200 95 L180 80 Z"
        fill="url(#truck-cabin)"
        stroke="#1e3a5f"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Cabin roof */}
      <path
        d="M145 80 L155 65 L195 65 L200 80"
        fill="url(#truck-body)"
        stroke="#1e3a5f"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Windshield */}
      <path
        d="M165 85 L170 72 L190 72 L193 85 Z"
        fill="white"
        stroke="#1e3a5f"
        strokeWidth="1"
        strokeLinejoin="round"
        opacity="0.8"
      />

      {/* Side window */}
      <rect x="150" y="88" width="20" height="15" rx="2" fill="white" stroke="#1e3a5f" strokeWidth="1" opacity="0.7" />

      {/* Front bumper */}
      <rect x="195" y="110" width="8" height="30" rx="3" fill="url(#truck-body)" stroke="#1e3a5f" strokeWidth="1" />

      {/* Headlight */}
      <rect x="198" y="115" width="4" height="8" rx="2" fill="#0e7490" opacity="0.5" />

      {/* Rear wheels */}
      <circle cx="60" cy="155" r="18" fill="white" stroke="#1e3a5f" strokeWidth="1.5" />
      <circle cx="60" cy="155" r="10" fill="#1e3a5f" opacity="0.08" />
      <circle cx="60" cy="155" r="4" fill="#1e3a5f" opacity="0.2" />

      <circle cx="95" cy="155" r="18" fill="white" stroke="#1e3a5f" strokeWidth="1.5" />
      <circle cx="95" cy="155" r="10" fill="#1e3a5f" opacity="0.08" />
      <circle cx="95" cy="155" r="4" fill="#1e3a5f" opacity="0.2" />

      {/* Front wheel */}
      <circle cx="180" cy="155" r="16" fill="white" stroke="#1e3a5f" strokeWidth="1.5" />
      <circle cx="180" cy="155" r="9" fill="#1e3a5f" opacity="0.08" />
      <circle cx="180" cy="155" r="3.5" fill="#1e3a5f" opacity="0.2" />

      {/* GPS antenna on roof */}
      <rect x="90" y="50" width="6" height="12" rx="2" fill="white" stroke="#0e7490" strokeWidth="1.5" />
      <circle cx="93" cy="48" r="4" fill="#0e7490" opacity="0.3" />
      <circle cx="93" cy="48" r="2" fill="#0e7490" />

      {/* GPS signal waves */}
      <path d="M93 40 Q102 28 111 40" stroke="#0e7490" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M90 32 Q102 18 114 32" stroke="#0e7490" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" />
      <path d="M87 24 Q102 8 117 24" stroke="#0e7490" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.15" />

      {/* Small fleet indicator dots */}
      <circle cx="45" cy="85" r="3" fill="#0e7490" opacity="0.3" />
      <circle cx="45" cy="95" r="3" fill="#0e7490" opacity="0.2" />
      <circle cx="45" cy="105" r="3" fill="#0e7490" opacity="0.1" />

      {/* Door handle */}
      <rect x="160" y="115" width="8" height="3" rx="1.5" fill="#1e3a5f" opacity="0.2" />

      {/* Side mirror */}
      <path d="M200 90 L208 88 L208 95 L200 97" fill="url(#truck-body)" stroke="#1e3a5f" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  )
}

