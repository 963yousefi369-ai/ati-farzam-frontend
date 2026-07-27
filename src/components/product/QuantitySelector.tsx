"use client";
import { Minus, Plus } from "lucide-react";
import { toFa } from "@/lib/utils";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
}: QuantitySelectorProps) {
  return (
    <div className="flex w-fit items-center overflow-hidden rounded-xl border border-border-default bg-white">
      <button
        type="button"
        aria-label="کاهش تعداد"
        className="flex h-11 w-11 items-center justify-center text-text-secondary hover:bg-bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-30"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
      >
        <Minus className="h-4 w-4" />
      </button>
      <span
        className="w-11 select-none border-x border-border-default text-center text-sm font-bold tabular-nums text-text-primary"
        aria-live="polite"
        aria-label={`تعداد: ${toFa(value)}`}
      >
        {toFa(value)}
      </span>
      <button
        type="button"
        aria-label="افزایش تعداد"
        className="flex h-11 w-11 items-center justify-center text-text-secondary hover:bg-bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-30"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
