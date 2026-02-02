export default function CardSkeleton() {
  return (
    <div className="flex items-start gap-4 md:gap-5 py-4 md:py-5 border-b border-white/[0.07] animate-pulse">
      {/* Thumbnail skeleton */}
      <div className="shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg bg-white/[0.06]" />

      {/* Content skeleton */}
      <div className="flex-1 min-w-0 space-y-2">
        {/* Date skeleton */}
        <div className="h-3 w-28 bg-white/[0.06] rounded" />

        {/* Title skeleton */}
        <div className="h-4 w-3/4 bg-white/[0.06] rounded" />

        {/* Chips skeleton */}
        <div className="flex gap-1.5">
          <div className="h-4 w-14 bg-white/[0.06] rounded-full" />
          <div className="h-4 w-10 bg-white/[0.06] rounded-full" />
        </div>

        {/* Description skeleton - desktop only */}
        <div className="hidden md:block h-3 w-1/2 bg-white/[0.06] rounded" />
      </div>
    </div>
  );
}

export function CardSkeletonList({ count = 5 }) {
  return (
    <div className="my-6">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
