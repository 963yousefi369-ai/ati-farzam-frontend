import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex min-h-6 items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
  {
    variants: {
      variant: {
        default: "border-primary/20 bg-primary/10 text-primary",
        secondary: "border-border-default bg-bg-secondary text-text-secondary",
        success: "border-success/20 bg-success/10 text-success",
        warning: "border-amber/20 bg-amber/10 text-amber",
        destructive: "border-error/20 bg-error/10 text-error",
        outline: "border-border-default bg-white text-text-primary",
        gradient: "border-primary/20 bg-primary/10 text-primary",
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
