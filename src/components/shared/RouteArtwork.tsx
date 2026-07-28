type RouteArtworkProps = {
  className?: string;
  label?: string;
};

/**
 * Signal Route artwork — the visual identity motif of ATI Farzam.
 * Pure SVG, no dependencies, inherits color via `currentColor`.
 */
export default function RouteArtwork({ className, label }: RouteArtworkProps) {
  return (
    <svg
      viewBox="0 0 720 320"
      fill="none"
      className={className}
      role={label ? "img" : "presentation"}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="route-grid"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M40 0H0V40"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.28"
          />
        </pattern>
        <radialGradient id="route-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.55" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="720" height="320" fill="url(#route-grid)" />

      <path
        d="M-10 250C90 250 120 150 220 150C320 150 350 70 470 70C590 70 640 120 730 120"
        stroke="currentColor"
        strokeWidth="1.6"
        opacity="0.55"
        strokeLinecap="round"
      />
      <path
        d="M-10 300C120 300 170 210 300 210C430 210 480 260 730 200"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeDasharray="6 10"
        opacity="0.35"
        strokeLinecap="round"
      />

      {[
        { x: 220, y: 150 },
        { x: 470, y: 70 },
        { x: 300, y: 210 },
      ].map((node) => (
        <g key={`${node.x}-${node.y}`}>
          <circle
            cx={node.x}
            cy={node.y}
            r="46"
            fill="url(#route-glow)"
            opacity="0.5"
          />
          <circle
            cx={node.x}
            cy={node.y}
            r="20"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.35"
          />
          <circle
            cx={node.x}
            cy={node.y}
            r="11"
            stroke="currentColor"
            strokeWidth="1.2"
            opacity="0.6"
          />
          <circle cx={node.x} cy={node.y} r="4" fill="currentColor" />
        </g>
      ))}
    </svg>
  );
}
