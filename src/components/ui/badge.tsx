import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex min-h-6 items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
  {
    variants: {
      variant: {
        default: "border-primary/20 bg-primary/10 text-primary",
        secondary: "border-border-default bg-bg-secondary text-text-secondary",
        success: "border-success/20 bg-success/10 text-accent-dark",
        // FIX: previously `border-amber/20 bg-amber/10 text-amber`, and
        // `amber` was never defined in the Tailwind palette — the variant
        // rendered with no colour at all. `amber` is now defined, and the
        // text uses the darker token for contrast on the tinted fill.
        warning: "border-amber/20 bg-amber/10 text-warning",
        destructive: "border-error/20 bg-error/10 text-error-text",
        outline: "border-border-default bg-white text-text-primary",
        // Was a dead alias for `default`. Now the real brand gradient —
        // reserved for hero eyebrows and "new / featured" flags.
        gradient: "border-0 bg-gradient-brand text-white shadow-soft",
        // Low-ink version for use on tinted or busy backgrounds.
        'gradient-subtle':
          "border-primary/15 bg-gradient-brand-subtle text-primary",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
