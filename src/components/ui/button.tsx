import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-primary bg-primary text-white hover:bg-primary-dark",
        secondary:
          "border border-primary/20 bg-primary/10 text-primary hover:bg-primary/20",
        outline:
          "border border-border-default bg-white text-text-primary hover:border-primary/30 hover:bg-bg-secondary",
        ghost:
          "border border-transparent text-text-secondary hover:bg-bg-secondary hover:text-text-primary",
        destructive: "border border-error bg-error text-white hover:bg-red-700",
        link: "min-h-0 rounded-none border-0 px-1 text-primary underline-offset-4 hover:underline",
        gradient:
          "border border-primary bg-primary text-white hover:bg-primary-dark",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-10 min-h-10 px-4 text-xs",
        lg: "h-12 px-7",
        xl: "h-14 px-8 text-base",
        icon: "h-11 w-11 px-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
