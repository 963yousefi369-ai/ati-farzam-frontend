import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Motion: the old base only transitioned `colors`, so buttons had no
  // physical response at all. Now transform + shadow ride the settle curve,
  // with a real press state. Focus ring moved off accent teal (2.3:1 on
  // white, fails WCAG 2.2 SC 1.4.11) onto primary navy (7.09:1).
  "group relative inline-flex min-h-touch items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-xl px-4 text-sm font-semibold " +
    "transition-[color,background-color,border-color,box-shadow,transform] duration-base ease-settle " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 " +
    "active:scale-[.98] disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none motion-reduce:active:scale-100",
  {
    variants: {
      variant: {
        default:
          "border border-primary bg-primary text-white shadow-soft hover:bg-primary-dark hover:shadow-navy hover:-translate-y-px",
        secondary:
          "border border-primary/20 bg-primary/10 text-primary hover:border-primary/30 hover:bg-primary/20",
        // FIX: this was `bg-white`, so every outline button sitting on a dark
        // surface rendered as an opaque white slab. Callers tried to adapt it
        // with `text-white border-white/20`, but nothing overrode the
        // background, so the label went white-on-white and vanished — exactly
        // what happened to "درخواست دمو رایگان" in the /software hero.
        // `bg-transparent` is visually identical on the light surfaces where
        // this variant normally lives, and inherits correctly everywhere else.
        outline:
          "border border-border-default bg-transparent text-text-primary shadow-soft hover:border-primary/30 hover:bg-bg-secondary hover:shadow-card",
        // Purpose-built secondary action for dark bands (hero sections, navy
        // CTA panels). Use this instead of patching `outline` with utilities.
        outlineOnDark:
          "border border-white/25 bg-white/[0.06] text-white shadow-none backdrop-blur-sm " +
          "hover:border-white/40 hover:bg-white/[0.14] hover:-translate-y-px " +
          "focus-visible:ring-white focus-visible:ring-offset-transparent",
        ghost:
          "border border-transparent text-text-secondary hover:bg-bg-secondary hover:text-text-primary",
        // Ghost's sibling for dark surfaces — no border, no fill until hover.
        ghostOnDark:
          "border border-transparent text-white/80 hover:bg-white/10 hover:text-white " +
          "focus-visible:ring-white focus-visible:ring-offset-transparent",
        destructive:
          "border border-error bg-error text-white shadow-soft hover:bg-red-700 hover:-translate-y-px",
        link: "min-h-0 rounded-none border-0 px-1 text-primary underline-offset-4 hover:underline",
        // Was a dead alias for the solid default. Now the real brand
        // gradient with a sheen sweep on hover — reserved for the single
        // primary CTA per screen, which is what keeps the gradient at ~5%.
        gradient:
          "border-0 bg-gradient-brand text-white shadow-navy hover:-translate-y-px hover:shadow-elevated " +
          "before:absolute before:inset-0 before:bg-gradient-brand-sheen before:translate-x-[-150%] " +
          "before:transition-transform before:duration-slow before:ease-settle hover:before:translate-x-[150%] " +
          "motion-reduce:before:hidden",
      },
      size: {
        default: "h-11 px-5",
        // FIX: was h-10/min-h-10 (40px), below the 44px touch floor, and it
        // is the most widely used size in the app.
        sm: "h-11 min-h-touch px-4 text-xs",
        lg: "h-12 px-7",
        xl: "h-14 px-8 text-base",
        icon: "h-11 w-11 min-w-touch px-0",
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
