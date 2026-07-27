import Link from "next/link";
import { PackageSearch } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-border-default bg-bg-secondary/50 px-5 py-10 text-center sm:px-8">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <PackageSearch className="h-6 w-6" aria-hidden="true" />
      </div>
      <p className="text-base font-bold text-text-primary">{title}</p>
      {description && (
        <p className="mt-2 max-w-sm text-sm leading-7 text-text-muted">
          {description}
        </p>
      )}
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
