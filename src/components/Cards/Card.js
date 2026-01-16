import Image from 'next/image';

export default function Card({
  day,
  time,
  title,
  chips,
  subtitle,
  description,
  image,
  imageStyle = "cover",
  isPast = false,
}) {
  const imageClasses = imageStyle === "cover"
    ? "object-cover"
    : "object-contain";

  const imageContainerClasses = imageStyle === "cover"
    ? "relative sm:rounded-2xl overflow-hidden w-full h-48 md:h-full"
    : "relative sm:rounded-2xl overflow-hidden flex items-center justify-center w-full h-48 md:h-full";

  // Check if today is launch day
  const isToday = day === "Today";

  // Date box classes based on state: past, today, or future
  const getDateBoxClasses = () => {
    const baseClasses = "sm:rounded-2xl justify-center text-center py-4 sm:py-8 sm:px-6 w-full md:w-auto transition-all duration-300";

    if (isPast) {
      // Glass-morphism style for past launches
      return `${baseClasses} backdrop-blur-[12px] bg-white/10 border border-white/20 text-past-muted`;
    }

    if (isToday) {
      // Today - vibrant purple/indigo to match theme
      return `${baseClasses} text-white bg-gradient-to-br from-[#6366f1] to-[#4f46e5] shadow-lg shadow-indigo-500/40`;
    }

    // Future launches - subtle purple tint to match theme
    return `${baseClasses} text-white bg-gradient-to-br from-[#3c2ea9]/80 to-[#2d2085]/80 border border-white/10`;
  };

  // Card container classes - modern styling with conditional past state
  const getCardClasses = () => {
    const baseClasses = "grid grid-cols-1 md:grid-cols-[150px_1fr_150px] sm:p-6 mt-8 relative rounded-2xl overflow-hidden transition-all duration-300 ease-out";

    if (isPast) {
      // Past launches: reduced opacity, muted colors, subtle hover
      return `${baseClasses} bg-black/30 opacity-75 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.4)] border border-white/5 text-past-muted hover:opacity-90 hover:bg-black/35`;
    }

    // Active/Future launches: full styling with glassy hover effect
    return `${baseClasses} bg-gradient-to-br from-black/50 to-black/30 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5),0_4px_6px_-2px_rgba(0,0,0,0.3)] border border-white/10 text-white hover:-translate-y-3 hover:shadow-[0_20px_50px_-15px_rgba(99,102,241,0.4),0_10px_20px_-5px_rgba(0,0,0,0.4)] hover:bg-white/10 hover:backdrop-blur-sm hover:border-indigo-400/40`;
  };

  return (
    <div className={getCardClasses()}>
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 pointer-events-none" />

      {/* Image - TOP on mobile, RIGHT on desktop */}
      <div className={`${imageContainerClasses} md:order-3 ${isPast ? 'opacity-60 grayscale-[30%]' : ''}`}>
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 150px"
            className={imageClasses}
          />
        )}
      </div>

      {/* Mission Details - MIDDLE on mobile and desktop */}
      <div className="py-8 px-5 sm:p-5 md:order-2 relative z-10">
        <div>
          <h2 className={`my-0 text-xl flex items-center mb-2.5 font-merriweather ${isPast ? 'text-past-muted' : 'text-white'}`}>
            {title}
          </h2>

          {chips && chips.length > 0 && (
            <div className={`mb-2.5 [&>*:not(:last-child)]:mr-1.5 ${isPast ? 'opacity-60' : ''}`}>
              {chips}
            </div>
          )}

          {subtitle && (
            <div className={`mb-2.5 text-sm ${isPast ? 'text-past-muted/80' : ''}`}>
              {subtitle}
            </div>
          )}

          {description && (
            <div className={`text-xs leading-tight ${isPast ? 'text-past-muted/70' : ''}`}>
              {description}
            </div>
          )}
        </div>
      </div>

      {/* Date/Time Box - BOTTOM on mobile, LEFT on desktop */}
      <div className="flex items-center justify-center md:order-1 relative z-10">
        <div className={getDateBoxClasses()}>
          {isPast ? (
            <>
              {/* Launched Badge */}
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-launched-badge text-xs font-semibold tracking-wider">
                  ✓ LAUNCHED
                </span>
              </div>
              <div className="text-xs uppercase font-medium opacity-80">{day}</div>
              {time && <div className="text-base font-semibold mt-1.5 opacity-70">{time}</div>}
            </>
          ) : (
            <>
              <div className="text-sm uppercase font-medium tracking-wide">{day}</div>
              {time && <div className="text-xl font-semibold mt-2.5">{time}</div>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
