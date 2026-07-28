import { Skeleton } from "@/components/ui/skeleton";

/**
 * Skeleton mirrors the real ProductCard layout (aspect-[4/3] media,
 * p-5 body, min-h-11 action) so the grid does not jump when data arrives.
 */
export default function ProductSkeleton() {
  return (
    <div className="h-full overflow-hidden rounded-2xl border border-border-soft bg-white shadow-card">
      <div className="aspect-[4/3] border-b border-border-soft bg-bg-soft">
        <Skeleton className="h-full w-full rounded-none" />
      </div>
      <div className="space-y-2.5 p-5">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="mt-3 h-6 w-28" />
        <Skeleton className="mt-4 h-11 w-full rounded-xl" />
      </div>
    </div>
  );
}

export function ProductSkeletonGrid({ count = 12 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4"
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="flex min-h-[520px] items-center bg-gradient-to-br from-navy-deeper to-navy">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 px-4 md:grid-cols-2">
        <div className="space-y-5">
          <Skeleton className="h-12 w-3/4 bg-white/10" />
          <Skeleton className="h-6 w-full bg-white/10" />
          <Skeleton className="h-6 w-2/3 bg-white/10" />
          <div className="flex gap-3 pt-4">
            <Skeleton className="h-12 w-36 rounded-xl bg-white/10" />
            <Skeleton className="h-12 w-36 rounded-xl bg-white/10" />
          </div>
        </div>
        <Skeleton className="h-72 w-full rounded-3xl bg-white/10" />
      </div>
    </div>
  );
}

export function BlogSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border-soft bg-white">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex items-center gap-2 pt-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
}
