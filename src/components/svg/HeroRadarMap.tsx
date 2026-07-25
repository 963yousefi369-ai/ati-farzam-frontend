/** HeroRadarMap — Concentric radar rings with glowing route dots */
export default function HeroRadarMap({ className = 'w-full h-full' }: { className?: string }) {
  return (
    <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Background grid */}
      <defs>
        <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#1e3a5f" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0e7490" />
          <stop offset="100%" stopColor="#1e3a5f" />
        </linearGradient>
      </defs>
      {/* Glow base */}
      <circle cx="250" cy="250" r="240" fill="url(#radarGlow)" />
      {/* Concentric rings */}
      {[60, 120, 180, 230].map((r, i) => (
        <circle
          key={r}
          cx="250"
          cy="250"
          r={r}
          stroke="#1e3a5f"
          strokeWidth="0.5"
          strokeOpacity={0.15 - i * 0.02}
          fill="none"
          strokeDasharray="4 4"
        />
      ))}
      {/* Cross lines */}
      <line x1="250" y1="20" x2="250" y2="480" stroke="#1e3a5f" strokeOpacity="0.06" strokeWidth="0.5" />
      <line x1="20" y1="250" x2="480" y2="250" stroke="#1e3a5f" strokeOpacity="0.06" strokeWidth="0.5" />
      {/* Route path */}
      <path
        d="M100 350 Q180 300 220 250 T320 180 Q360 150 400 120"
        stroke="url(#routeGrad)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="8 4"
      />
      {/* Route dots */}
      {[
        { cx: 100, cy: 350 },
        { cx: 180, cy: 310 },
        { cx: 220, cy: 250 },
        { cx: 280, cy: 210 },
        { cx: 320, cy: 180 },
        { cx: 400, cy: 120 },
      ].map((p, i) => (
        <g key={i}>
          <circle cx={p.cx} cy={p.cy} r="6" fill="#0e7490" opacity="0.15" />
          <circle cx={p.cx} cy={p.cy} r="3" fill="#0e7490" />
          <circle cx={p.cx} cy={p.cy} r="1.5" fill="white" />
        </g>
      ))}
      {/* Pulsing center dot */}
      <circle cx="280" cy="210" r="12" fill="#0e7490" opacity="0.1">
        <animate attributeName="r" from="8" to="20" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.2" to="0" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="280" cy="210" r="5" fill="#0e7490" />
      <circle cx="280" cy="210" r="2" fill="white" />
    </svg>
  )
}
