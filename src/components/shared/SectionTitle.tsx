import { cn } from "@/lib/utils";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "right" | "left";
  centered?: boolean;
  dark?: boolean;
  className?: string;
  action?: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4";
}

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align,
  centered,
  dark = false,
  className,
  action,
  as: Tag = "h2",
}: SectionTitleProps) {
  const isCentered = centered ?? align === "center";

  return (
    <div className={cn("mb-6", isCentered && "text-center", className)}>
      <div
        className={cn(
          "flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between",
          isCentered && "items-center sm:flex-col sm:items-center",
        )}
      >
        <div className="min-w-0">
          {eyebrow && (
            <p
              className={cn(
                "mb-2 flex items-center gap-2 text-xs font-semibold",
                dark ? "text-accent" : "text-accent-dark",
              )}
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-accent"
                aria-hidden="true"
              />
              {eyebrow}
            </p>
          )}
          <Tag
            className={cn(
              "break-words text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl",
              dark ? "text-white" : "text-dark",
            )}
          >
            {title}
          </Tag>
          <span
            className="mt-3 block h-0.5 w-12 bg-accent"
            aria-hidden="true"
          />
          {subtitle && (
            <p
              className={cn(
                "mt-3 max-w-3xl text-sm leading-7 sm:text-base",
                dark ? "text-white/70" : "text-text-muted",
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
        {action && <div className="w-full shrink-0 sm:w-auto">{action}</div>}
      </div>
    </div>
  );
}
