'use client';

interface PulsingDotProps {
  color?: 'green' | 'blue' | 'red';
  size?: number;
}

const colorMap = {
  green: 'var(--teal)',
  blue: 'var(--navy)',
  red: 'var(--error)',
};

export default function PulsingDot({ color = 'green', size = 8 }: PulsingDotProps) {
  const hex = colorMap[color];

  return (
    <span
      className="relative inline-flex items-center justify-center"
      style={{ width: size * 3, height: size * 3 }}
      aria-hidden="true"
    >
      <span
        className="absolute rounded-full animate-ping"
        style={{ width: size * 2, height: size * 2, backgroundColor: hex, opacity: 0.4 }}
      />
      <span
        className="relative rounded-full"
        style={{ width: size, height: size, backgroundColor: hex }}
      />
    </span>
  );
}
