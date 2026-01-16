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
  onClick,
}) {
  const imageClasses = imageStyle === "cover"
    ? "object-cover"
    : "object-contain";

  // Check if today is launch day
  const isToday = day === "Today";

  // Card container classes - modern styling with conditional past state
  const getCardClasses = () => {
    // Mobile: side-by-side (image left, content right)
    // Desktop: three columns (date left, content middle, image right)
    const baseClasses = "grid grid-cols-[100px_1fr] md:grid-cols-[150px_1fr_150px] gap-4 md:gap-0 p-4 sm:p-6 mt-4 sm:mt-8 relative rounded-2xl overflow-hidden transition-all duration-300 ease-out";

    if (isPast) {
      return `${baseClasses} bg-black/30 opacity-75 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.4)] border border-white/5 text-past-muted hover:opacity-90 hover:bg-black/35`;
    }

    return `${baseClasses} bg-gradient-to-br from-black/50 to-black/30 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5),0_4px_6px_-2px_rgba(0,0,0,0.3)] border border-white/10 text-white hover:-translate-y-3 hover:shadow-[0_20px_50px_-15px_rgba(99,102,241,0.4),0_10px_20px_-5px_rgba(0,0,0,0.4)] hover:bg-white/10 hover:backdrop-blur-sm hover:border-indigo-400/40`;
  };

  // Date/time display for mobile (inline) vs desktop (box)
  const getDateDisplay = () => {
    if (isPast) {
      return (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-launched-badge font-semibold">✓</span>
          <span className="text-past-muted/80">{day}</span>
          {time && <span className="text-past-muted/60">• {time}</span>}
        </div>
      );
    }

    return (
      <div className={`flex items-center gap-2 text-sm ${isToday ? 'text-indigo-400' : 'text-white/70'}`}>
        <span className="font-medium">{day}</span>
        {time && <span className="opacity-70">• {time}</span>}
      </div>
    );
  };

  // Desktop date box classes
  const getDateBoxClasses = () => {
    const baseClasses = "hidden md:flex flex-col sm:rounded-2xl justify-center text-center py-4 sm:py-8 sm:px-6 w-full md:w-auto transition-all duration-300";

    if (isPast) {
      return `${baseClasses} backdrop-blur-[12px] bg-white/10 border border-white/20 text-past-muted`;
    }

    if (isToday) {
      return `${baseClasses} text-white bg-gradient-to-br from-[#6366f1] to-[#4f46e5] shadow-lg shadow-indigo-500/40`;
    }

    return `${baseClasses} text-white bg-gradient-to-br from-[#3c2ea9]/80 to-[#2d2085]/80 border border-white/10`;
  };

  return (
    <div className={`${getCardClasses()} cursor-pointer`} onClick={onClick}>
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 pointer-events-none" />

      {/* Image - LEFT on mobile, RIGHT on desktop */}
      <div className={`relative rounded-xl overflow-hidden h-24 md:h-full md:order-3 ${isPast ? 'opacity-60 grayscale-[30%]' : ''}`}>
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100px, 150px"
            className={imageClasses}
          />
        )}
      </div>

      {/* Content - RIGHT on mobile, MIDDLE on desktop */}
      <div className="flex flex-col justify-center md:order-2 md:px-5 relative z-10">
        {/* Mobile date/time - inline */}
        <div className="md:hidden mb-2">
          {getDateDisplay()}
        </div>

        <h2 className={`my-0 text-base md:text-xl leading-tight mb-2 font-merriweather ${isPast ? 'text-past-muted' : 'text-white'}`}>
          {title}
        </h2>

        {chips && chips.length > 0 && (
          <div className={`mb-2 [&>*:not(:last-child)]:mr-1.5 ${isPast ? 'opacity-60' : ''}`}>
            {chips}
          </div>
        )}

        {subtitle && (
          <div className={`text-xs md:text-sm ${isPast ? 'text-past-muted/80' : 'text-white/80'}`}>
            {subtitle}
          </div>
        )}

        {/* Description - hidden on mobile for cleaner look */}
        {description && (
          <div className={`hidden md:block text-xs leading-tight mt-2 ${isPast ? 'text-past-muted/70' : 'text-white/60'}`}>
            {description}
          </div>
        )}
      </div>

      {/* Desktop Date/Time Box - hidden on mobile, LEFT on desktop */}
      <div className="hidden md:flex items-center justify-center md:order-1 relative z-10">
        <div className={getDateBoxClasses()}>
          {isPast ? (
            <>
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
