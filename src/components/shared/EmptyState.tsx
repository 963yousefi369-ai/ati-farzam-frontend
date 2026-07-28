import type { ReactNode } from "react";
import Link from "next/link";
import { PackageSearch } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description?: string;
  /** Optional custom icon. Falls back to a package-search glyph. */
  icon?: ReactNode;
  /** Optional custom action node (button, multiple links, ...). */
  action?: ReactNode;
  /** Simple link action. Ignored when `action` is provided. */
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

export default function EmptyState({
  title,
  description,
  icon,
  action,
  actionLabel,
  actionHref,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-64 flex-col items-center justify-center rounded-3xl border border-dashed border-border-default bg-bg-secondary/50 px-5 py-12 text-center sm:px-8",
        className,
      )}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        {icon ?? <PackageSearch className="h-6 w-6" aria-hidden="true" />}
      </div>
      <p className="text-base font-bold text-text-primary">{title}</p>
      {description && (
        <p className="mt-2 max-w-sm text-sm leading-7 text-text-muted">
          {description}
        </p>
      )}
      {action ? (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {action}
        </div>
      ) : (
        actionLabel &&
        actionHref && (
          <Link
            href={actionHref}
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            {actionLabel}
          </Link>
        )
      )}
    </div>
  );
}
