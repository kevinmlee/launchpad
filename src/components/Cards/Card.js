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

  // Card container classes - unified layout for mobile and desktop
  const getCardClasses = () => {
    // Two columns: image left, content right (consistent across breakpoints)
    const baseClasses = "grid grid-cols-[100px_1fr] md:grid-cols-[140px_1fr] gap-4 md:gap-6 p-4 md:p-5 mt-4 sm:mt-6 relative rounded-2xl overflow-hidden transition-all duration-300 ease-out";

    if (isPast) {
      return `${baseClasses} bg-[#2a2535] opacity-80 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.5)] border border-white/10 text-past-muted hover:opacity-90`;
    }

    return `${baseClasses} bg-[#2d2640] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] border border-white/15 text-white hover:border-indigo-400/40 hover:shadow-[0_10px_40px_-10px_rgba(99,102,241,0.35)]`;
  };

  // Unified date/time display
  const getDateDisplay = () => {
    if (isPast) {
      return (
        <div className="flex items-center gap-2 text-sm md:text-base">
          <span className="text-launched-badge font-semibold">✓</span>
          <span className="text-past-muted/80">{day}</span>
          {time && <span className="text-past-muted/60">• {time}</span>}
        </div>
      );
    }

    return (
      <div className={`flex items-center gap-2 text-sm md:text-base ${isToday ? 'text-indigo-400' : 'text-white/60'}`}>
        <span className="font-medium">{day}</span>
        {time && <span className="opacity-80">• {time}</span>}
      </div>
    );
  };

  return (
    <div className={`${getCardClasses()} cursor-pointer`} onClick={onClick}>
      {/* Image - LEFT on both mobile and desktop */}
      <div className={`relative rounded-xl overflow-hidden h-24 md:h-28 ${isPast ? 'opacity-60 grayscale-[30%]' : ''}`}>
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100px, 140px"
            className={imageClasses}
          />
        )}
      </div>

      {/* Content - RIGHT on both mobile and desktop */}
      <div className="flex flex-col justify-center relative z-10">
        {/* Date/time - inline */}
        <div className="mb-1.5 md:mb-2">
          {getDateDisplay()}
        </div>

        <h2 className={`my-0 text-base md:text-lg leading-tight mb-1.5 md:mb-2 font-merriweather ${isPast ? 'text-past-muted' : 'text-white'}`}>
          {title}
        </h2>

        {chips && chips.length > 0 && (
          <div className={`mb-1.5 md:mb-2 [&>*:not(:last-child)]:mr-1.5 ${isPast ? 'opacity-60' : ''}`}>
            {chips}
          </div>
        )}

        {subtitle && (
          <div className={`text-xs md:text-sm ${isPast ? 'text-past-muted/80' : 'text-white/70'}`}>
            {subtitle}
          </div>
        )}

        {/* Description - visible on desktop, truncated */}
        {description && (
          <div className={`hidden md:block text-xs leading-relaxed mt-2 line-clamp-2 ${isPast ? 'text-past-muted/60' : 'text-white/50'}`}>
            {description}
          </div>
        )}
      </div>
    </div>
  );
}
