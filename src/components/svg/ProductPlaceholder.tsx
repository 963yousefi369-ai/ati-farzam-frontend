/** ProductPlaceholder — GPS tracker device SVG placeholder */
export default function ProductPlaceholder({ className = 'w-full h-full' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="تصویر محصول">
      {/* Device body */}
      <rect x="50" y="40" width="100" height="120" rx="16" fill="var(--light-tint)" stroke="#1e3a5f" strokeWidth="1.5" />
      {/* Screen */}
      <rect x="62" y="55" width="76" height="50" rx="8" fill="white" stroke="#1e3a5f" strokeWidth="0.8" strokeOpacity="0.3" />
      {/* Signal waves on screen */}
      <path d="M85 80 Q100 65 115 80" stroke="#0e7490" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M90 80 Q100 70 110 80" stroke="#1e3a5f" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5" />
      {/* Pin icon on screen */}
      <circle cx="100" cy="88" r="4" fill="#1e3a5f" />
      <circle cx="100" cy="88" r="1.5" fill="white" />
      {/* LED dots */}
      <circle cx="72" cy="120" r="3" fill="#0e7490" />
      <circle cx="84" cy="120" r="3" fill="#1e3a5f" opacity="0.3" />
      <circle cx="96" cy="120" r="3" fill="#1e3a5f" opacity="0.3" />
      {/* Bottom detail */}
      <rect x="80" y="135" width="40" height="4" rx="2" fill="#1e3a5f" opacity="0.15" />
    </svg>
  )
}

