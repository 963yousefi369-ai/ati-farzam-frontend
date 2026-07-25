'use client';
import { useReducedMotion } from 'framer-motion';

interface TrackingTickerProps {
  stats: { label: string; value: string }[];
  speed?: number;
}

export default function TrackingTicker({ stats, speed = 30 }: TrackingTickerProps) {
  const prefersReducedMotion = useReducedMotion();
  const content = stats
    .map((s) => `${s.label}: ${s.value}`)
    .join('  \u2022  ');

  return (
    <div className="w-full overflow-hidden rounded-full bg-primary-deep px-4 py-2" aria-label="آمار ردیابی">
      <div
        dir="ltr"
        className="flex whitespace-nowrap text-sm font-medium text-white"
        style={prefersReducedMotion ? undefined : {
          animation: `ticker ${speed}s linear infinite`,
        }}
      >
        <span className="pr-12">{content}</span>
        <span className="pr-12">{content}</span>
        <span className="pr-12">{content}</span>
      </div>
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}
