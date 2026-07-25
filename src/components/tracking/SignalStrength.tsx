'use client';

interface SignalStrengthProps {
  bars?: 1 | 2 | 3 | 4;
  activeColor?: string;
}

export default function SignalStrength({ bars = 4, activeColor = 'var(--teal)' }: SignalStrengthProps) {
  const barHeights = [4, 8, 12, 16];

  return (
    <div className="inline-flex items-end gap-0.5" aria-hidden="true">
      {barHeights.map((h, i) => {
        const isActive = i < bars;
        return (
          <div
            key={i}
            className="rounded-sm transition-all duration-400"
            style={{
              width: 4,
              height: isActive ? h : 2,
              backgroundColor: isActive ? activeColor : '#cbd5e1',
              transitionDelay: `${i * 100}ms`,
            }}
          />
        );
      })}
    </div>
  );
}
