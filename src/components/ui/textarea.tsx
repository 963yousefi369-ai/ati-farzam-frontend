import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        "flex min-h-28 w-full resize-y rounded-xl border border-border-default bg-white px-4 py-3 text-base leading-7 text-text-primary outline-none placeholder:text-text-muted/100 focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:bg-bg-secondary disabled:opacity-70 sm:text-sm",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

export { Textarea };
