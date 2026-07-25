/** LogoAtiFarzam — Shield + Pin SVG logo placeholder */
export default function LogoAtiFarzam({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="لوگو آتی فرزام">
      {/* Shield */}
      <path
        d="M24 4L6 12v12c0 11 8 18 18 22 10-4 18-11 18-22V12L24 4z"
        fill="#1e3a5f"
        opacity="0.12"
      />
      <path
        d="M24 4L6 12v12c0 11 8 18 18 22 10-4 18-11 18-22V12L24 4z"
        stroke="#1e3a5f"
        strokeWidth="2"
        fill="none"
      />
      {/* Pin */}
      <path
        d="M24 14c-3.3 0-6 2.7-6 6 0 4.5 6 13 6 13s6-8.5 6-13c0-3.3-2.7-6-6-6z"
        fill="#1e3a5f"
      />
      <circle cx="24" cy="20" r="2" fill="white" />
      {/* Accent dot */}
      <circle cx="24" cy="20" r="1" fill="#0e7490" />
    </svg>
  )
}
