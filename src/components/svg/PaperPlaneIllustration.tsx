/** PaperPlaneIllustration — Newsletter paper plane SVG */
export default function PaperPlaneIllustration({ className = 'w-48 h-48' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Envelope */}
      <rect x="30" y="80" width="140" height="100" rx="12" fill="var(--light-tint)" stroke="#1e3a5f" strokeWidth="1" strokeOpacity="0.2" />
      <path d="M30 92 L100 140 L170 92" stroke="#1e3a5f" strokeWidth="1" strokeOpacity="0.15" fill="none" />
      {/* Paper plane */}
      <path
        d="M60 120 L160 60 L130 150 L105 120 Z"
        fill="white"
        stroke="#1e3a5f"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M105 120 L160 60" stroke="#1e3a5f" strokeWidth="1" opacity="0.4" />
      {/* Motion lines */}
      <line x1="45" y1="105" x2="20" y2="115" stroke="#0e7490" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="50" y1="90" x2="25" y2="92" stroke="#0e7490" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      <line x1="55" y1="75" x2="35" y2="70" stroke="#0e7490" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      {/* Sparkles */}
      <circle cx="170" cy="50" r="3" fill="#0e7490" opacity="0.6" />
      <circle cx="155" cy="40" r="2" fill="#1e3a5f" opacity="0.3" />
      <circle cx="180" cy="65" r="2" fill="#0e7490" opacity="0.4" />
      {/* Dotted trail */}
      <path d="M160 60 Q180 50 190 30" stroke="#1e3a5f" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.2" fill="none" />
    </svg>
  )
}

