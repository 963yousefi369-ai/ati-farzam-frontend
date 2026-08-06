import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Card was the odd component out: no CVA (unlike Button and Badge), no hover
// state, and a hardcoded shadow literal that bypassed the token system
// entirely. It is now on CVA with token-backed, brand-tinted elevation.
const cardVariants = cva(
  "rounded-2xl border text-text-primary transition-[box-shadow,transform,border-color] duration-base ease-settle motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default: "border-border-default/70 bg-white shadow-card",
        interactive:
          "border-border-default/70 bg-white shadow-card hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-card-hover motion-reduce:hover:translate-y-0",
        glass: "glass shadow-card",
        elevated: "border-border-default/70 bg-white shadow-elevated",
        flat: "border-border-default/70 bg-bg-soft shadow-none",
        // Thin brand rule along the top edge — a disciplined way to use the
        // gradient as an accent instead of as a background.
        accent:
          "accent-line-top border-border-default/70 bg-white shadow-card hover:shadow-card-hover",
      },
      padding: {
        none: "",
        sm: "p-3 sm:p-4",
        md: "p-4 sm:p-6",
      },
    },
    defaultVariants: { variant: "default", padding: "none" },
  },
);

export interface CardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding }), className)}
      {...props}
    />
  ),
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-4 sm:p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-base font-bold leading-heading text-text-primary sm:text-lg",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm leading-body text-text-tertiary", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-4 pt-0 sm:p-6 sm:pt-0", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-4 pt-0 sm:p-6 sm:pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
};
