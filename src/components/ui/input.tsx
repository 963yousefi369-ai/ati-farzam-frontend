import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Input previously had no state variants at all, so checkout and auth forms
// hand-rolled their own error styling per screen. It also focused with
// `ring-accent/20` — a 20%-opacity teal ring that was effectively invisible.
const inputVariants = cva(
  "flex h-12 w-full rounded-xl border bg-white px-4 py-2 text-base text-text-primary outline-none " +
    "transition-[border-color,box-shadow] duration-base ease-settle " +
    "placeholder:text-text-muted " +
    "disabled:cursor-not-allowed disabled:bg-bg-secondary disabled:opacity-70 " +
    "motion-reduce:transition-none sm:text-sm",
  {
    variants: {
      variant: {
        default:
          "border-border-default focus:border-primary focus:ring-2 focus:ring-primary/40",
        error:
          "border-error text-error-text focus:border-error focus:ring-2 focus:ring-error/40",
        success:
          "border-success focus:border-success focus:ring-2 focus:ring-success/40",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface InputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  /** Convenience prop: sets the error variant and aria-invalid together. */
  invalid?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, invalid, ...props }, ref) => {
    const resolved = invalid ? "error" : variant;
    return (
      <input
        type={type}
        aria-invalid={invalid || variant === "error" || undefined}
        className={cn(inputVariants({ variant: resolved }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input, inputVariants };
