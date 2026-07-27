import Link from 'next/link'

interface EmptyStateProps {
  title: string
  description?: string
  actionLabel?: string
  actionHref?: string
}

/**
 * Only ever use this INSIDE a real page (search results, cart, order history).
 *
 * Never render an empty state on the marketing homepage — if a homepage section
 * has no data, hide the whole section instead (see `normalizeSections`).
 */
export default function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-hairline bg-white px-6 py-14 text-center">
      <p className="text-base font-semibold text-dark">{title}</p>
      {description && <p className="max-w-sm text-sm leading-7 text-text-muted">{description}</p>}
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-2 inline-flex min-h-[44px] items-center rounded-full bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  )
}
