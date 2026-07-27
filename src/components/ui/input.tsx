import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-xl border border-border-default bg-white px-4 py-2 text-base text-text-primary outline-none placeholder:text-text-muted/100 focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:bg-bg-secondary disabled:opacity-70 sm:text-sm",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };
