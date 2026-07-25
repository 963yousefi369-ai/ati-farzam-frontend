/** DashboardMockup — Laptop + Phone dashboard UI mockup SVG */
export default function DashboardMockup({ className = 'w-full h-full' }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 380" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="پلتفرم ردیابی">
      {/* Laptop body */}
      <rect x="20" y="20" width="380" height="240" rx="12" fill="#0a1019" stroke="#1e3a5f" strokeWidth="1" />
      {/* Screen */}
      <rect x="30" y="30" width="360" height="210" rx="6" fill="#0F1B2E" />
      {/* Dashboard header bar */}
      <rect x="30" y="30" width="360" height="32" rx="6" fill="#0f172a" />
      <rect x="42" y="42" width="60" height="8" rx="4" fill="#1e3a5f" opacity="0.5" />
      <circle cx="370" cy="46" r="4" fill="#0e7490" />
      <circle cx="356" cy="46" r="4" fill="#1e3a5f" opacity="0.3" />
      {/* Map area */}
      <rect x="42" y="72" width="200" height="140" rx="6" fill="#162238" />
      {/* Route line on map */}
      <path d="M60 180 Q100 140 140 150 T200 100" stroke="#0e7490" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Dots on route */}
      {[
        { cx: 60, cy: 180 },
        { cx: 100, cy: 150 },
        { cx: 140, cy: 150 },
        { cx: 200, cy: 100 },
      ].map((p, i) => (
        <g key={i}>
          <circle cx={p.cx} cy={p.cy} r="4" fill="#0e7490" opacity="0.3" />
          <circle cx={p.cx} cy={p.cy} r="2" fill="#0e7490" />
        </g>
      ))}
      {/* Grid lines on map */}
      {[90, 120, 150, 180].map((y) => (
        <line key={y} x1="42" y1={y} x2="242" y2={y} stroke="#1e3a5f" strokeOpacity="0.08" strokeWidth="0.5" />
      ))}
      {[80, 120, 160, 200].map((x) => (
        <line key={x} x1={x} y1="72" x2={x} y2="212" stroke="#1e3a5f" strokeOpacity="0.08" strokeWidth="0.5" />
      ))}
      {/* Sidebar stats */}
      <rect x="254" y="72" width="124" height="40" rx="6" fill="#162238" />
      <rect x="264" y="80" width="50" height="6" rx="3" fill="#1e3a5f" opacity="0.4" />
      <rect x="264" y="92" width="80" height="10" rx="5" fill="#0e7490" opacity="0.6" />
      <rect x="254" y="120" width="124" height="40" rx="6" fill="#162238" />
      <rect x="264" y="128" width="50" height="6" rx="3" fill="#1e3a5f" opacity="0.4" />
      <rect x="264" y="140" width="80" height="10" rx="5" fill="#1e3a5f" opacity="0.3" />
      <rect x="254" y="168" width="124" height="44" rx="6" fill="#162238" />
      <rect x="264" y="176" width="50" height="6" rx="3" fill="#1e3a5f" opacity="0.4" />
      {/* Mini chart */}
      <polyline points="264,200 274,195 284,198 294,190 304,193 314,188 324,192 334,185 344,190 354,184 364,188" stroke="#0e7490" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Laptop keyboard base */}
      <path d="M10 260 L20 260 Q20 260 20 260 L20 262 L400 262 L400 260 Q400 260 400 260 L410 260 L400 270 L20 270 Z" fill="#0f172a" />
      {/* Phone */}
      <rect x="420" y="60" width="120" height="220" rx="18" fill="#0a1019" stroke="#1e3a5f" strokeWidth="1" />
      <rect x="428" y="75" width="104" height="190" rx="10" fill="#0F1B2E" />
      {/* Phone status bar */}
      <rect x="428" y="75" width="104" height="20" rx="10" fill="#0f172a" />
      <circle cx="480" cy="82" r="3" fill="#1e3a5f" opacity="0.3" />
      {/* Phone map */}
      <rect x="434" y="100" width="92" height="70" rx="4" fill="#162238" />
      <path d="M445 155 Q465 130 485 140 T515 120" stroke="#0e7490" strokeWidth="1.5" fill="none" />
      <circle cx="485" cy="135" r="3" fill="#0e7490" />
      {/* Phone cards */}
      <rect x="434" y="178" width="92" height="24" rx="4" fill="#162238" />
      <rect x="440" y="184" width="40" height="5" rx="2.5" fill="#1e3a5f" opacity="0.4" />
      <rect x="440" y="193" width="60" height="5" rx="2.5" fill="#0e7490" opacity="0.5" />
      <rect x="434" y="208" width="92" height="24" rx="4" fill="#162238" />
      <rect x="440" y="214" width="40" height="5" rx="2.5" fill="#1e3a5f" opacity="0.4" />
      <rect x="440" y="223" width="60" height="5" rx="2.5" fill="#1e3a5f" opacity="0.3" />
      {/* Phone home indicator */}
      <rect x="460" y="252" width="40" height="4" rx="2" fill="#1e3a5f" opacity="0.2" />
      {/* Glow accents */}
      <circle cx="200" cy="150" r="40" fill="#0e7490" opacity="0.04" />
      <circle cx="480" cy="140" r="30" fill="#0e7490" opacity="0.04" />
    </svg>
  )
}

