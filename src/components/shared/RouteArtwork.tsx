interface RouteArtworkProps {
  className?: string;
  label?: string;
}

export default function RouteArtwork({
  className = "",
  label = "مسیر ردیابی هوشمند",
}: RouteArtworkProps) {
  return (
    <svg
      viewBox="0 0 900 420"
      className={className}
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="route-grid"
          width="42"
          height="42"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M42 0H0V42"
            fill="none"
            stroke="currentColor"
            strokeOpacity=".13"
          />
        </pattern>
        <filter id="route-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="900" height="420" fill="url(#route-grid)" />
      <path
        d="M-35 350C105 285 150 390 275 282S468 120 585 188 760 238 940 45"
        fill="none"
        stroke="currentColor"
        strokeOpacity=".28"
        strokeWidth="3"
        strokeDasharray="10 12"
      />
      <path
        d="M-30 70C115 145 210 42 338 115S515 330 700 260 820 185 940 230"
        fill="none"
        stroke="currentColor"
        strokeOpacity=".12"
        strokeWidth="2"
      />
      <g fill="currentColor" filter="url(#route-glow)">
        <circle cx="274" cy="282" r="6" />
        <circle cx="585" cy="188" r="6" />
        <circle cx="790" cy="205" r="6" />
      </g>
      <g fill="none" stroke="currentColor" strokeOpacity=".24">
        <circle cx="274" cy="282" r="18" />
        <circle cx="274" cy="282" r="32" />
        <circle cx="585" cy="188" r="18" />
        <circle cx="790" cy="205" r="18" />
      </g>
    </svg>
  );
}
