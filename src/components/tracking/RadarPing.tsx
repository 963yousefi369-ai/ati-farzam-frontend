'use client';

import { useReducedMotion } from 'framer-motion';

interface RadarPingProps {
  size?: number;
  color?: string;
}

export default function RadarPing({ size = 80, color = 'var(--teal)' }: RadarPingProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="absolute rounded-full border-2"
          style={{
            borderColor: color,
            width: '100%',
            height: '100%',
            ...(prefersReducedMotion
              ? { opacity: 0.3 }
              : { animation: `ping 2s cubic-bezier(0, 0, 0.2, 1) ${i * 0.6}s infinite` }
            ),
          }}
        />
      ))}
      <span
        className="relative rounded-full"
        style={{ width: size * 0.12, height: size * 0.12, backgroundColor: color }}
      />
    </div>
  );
}
