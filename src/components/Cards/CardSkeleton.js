export default function CardSkeleton() {
  return (
    <div className="grid grid-cols-[100px_1fr] md:grid-cols-[140px_1fr] gap-4 md:gap-6 p-4 md:p-5 mt-4 sm:mt-6 rounded-2xl bg-[#2d2640] border border-white/10 animate-pulse">
      {/* Image skeleton */}
      <div className="rounded-xl bg-white/10 h-24 md:h-28" />

      {/* Content skeleton */}
      <div className="flex flex-col justify-center gap-2">
        {/* Date skeleton */}
        <div className="h-4 w-32 bg-white/10 rounded" />

        {/* Title skeleton */}
        <div className="h-5 md:h-6 w-3/4 bg-white/10 rounded" />

        {/* Chips skeleton */}
        <div className="flex gap-2">
          <div className="h-5 w-16 bg-white/10 rounded-full" />
          <div className="h-5 w-12 bg-white/10 rounded-full" />
        </div>

        {/* Subtitle skeleton */}
        <div className="h-4 w-1/2 bg-white/10 rounded" />

        {/* Description skeleton - desktop only */}
        <div className="hidden md:block space-y-1.5 mt-1">
          <div className="h-3 w-full bg-white/10 rounded" />
          <div className="h-3 w-2/3 bg-white/10 rounded" />
        </div>
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
