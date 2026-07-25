'use client';
import { useReducedMotion } from 'framer-motion';

interface AnimatedRouteProps {
  direction?: 'horizontal' | 'vertical';
  color?: string;
}

export default function AnimatedRoute({
  direction = 'horizontal',
  color = 'var(--navy)',
}: AnimatedRouteProps) {
  const prefersReducedMotion = useReducedMotion();
  const isHorizontal = direction === 'horizontal';
  const width = isHorizontal ? 200 : 4;
  const height = isHorizontal ? 4 : 200;

  return (
    <svg width={width} height={height} className="overflow-visible" aria-hidden="true">
      <line
        x1={isHorizontal ? 0 : 2}
        y1={isHorizontal ? 2 : 0}
        x2={isHorizontal ? 200 : 2}
        y2={isHorizontal ? 2 : 200}
        stroke={color}
        strokeWidth={2}
        strokeDasharray="8 6"
        style={prefersReducedMotion ? undefined : { animation: 'dash-move 1.2s linear infinite' }}
      />
      <style>{`@keyframes dash-move { to { stroke-dashoffset: -28; } }`}</style>
    </svg>
  );
}
