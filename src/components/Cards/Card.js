"use client";

import Image from 'next/image';
import useCountdown from '../../hooks/useCountdown';

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
  launchDate,
  onClick,
  index = 0,
}) {
  const imageClasses = imageStyle === "cover"
    ? "object-cover"
    : "object-contain";

  // Check if today is launch day
  const isToday = day === "Today";

  // Countdown hook
  const { formatted: countdown, isImminent, isVerySoon } = useCountdown(isPast ? null : launchDate);

  // Card container classes - unified layout for mobile and desktop
  const getCardClasses = () => {
    // Two columns: image left, content right (consistent across breakpoints)
    const baseClasses = "grid grid-cols-[100px_1fr] md:grid-cols-[140px_1fr] gap-4 md:gap-6 p-4 md:p-5 mt-4 sm:mt-6 relative rounded-2xl overflow-hidden transition-all duration-300 ease-out";

    if (isPast) {
      return `${baseClasses} bg-[#2a2535] opacity-80 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.5)] border border-white/10 text-past-muted hover:opacity-90`;
    }

    return `${baseClasses} bg-[#2d2640] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] border border-white/15 text-white hover:border-indigo-400/40 hover:shadow-[0_10px_40px_-10px_rgba(99,102,241,0.35)]`;
  };

  // Status indicator dot
  const StatusDot = () => {
    if (isPast) return null;

    if (isVerySoon) {
      // Red pulsing dot for < 1 hour
      return (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
      );
    }

    if (isImminent || isToday) {
      // Green pulsing dot for < 24 hours or Today
      return (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
      );
    }

    return null;
  };

  // Unified date/time display with countdown
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
      <div className={`flex items-center gap-2 text-sm md:text-base flex-wrap`}>
        <StatusDot />
        <span className={`font-medium ${isToday ? 'text-indigo-400' : 'text-white/60'}`}>{day}</span>
        {time && <span className={`${isToday ? 'text-indigo-400/80' : 'text-white/50'}`}>• {time}</span>}
        {countdown && (
          <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${
            isVerySoon
              ? 'bg-red-500/20 text-red-400'
              : isImminent
                ? 'bg-green-500/20 text-green-400'
                : 'bg-white/10 text-white/50'
          }`}>
            {countdown}
          </span>
        )}
      </div>
    );
  };

  // Animation delay based on index
  const animationDelay = `${index * 100}ms`;

  return (
    <div
      className={`${getCardClasses()} cursor-pointer animate-fadeSlideIn`}
      style={{ animationDelay }}
      onClick={onClick}
    >
      {/* Image - LEFT on both mobile and desktop */}
      <div className={`relative rounded-xl overflow-hidden h-24 md:h-28 ${isPast ? 'opacity-60 grayscale-[30%]' : ''}`}>
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100px, 140px"
            className={`${imageClasses} transition-opacity duration-500`}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMH/8QAIhAAAgEDAwUBAAAAAAAAAAAAAQIDAAQRBRIhBhMiMUFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEEA/ANT6d1K0sdJtLW6WdbiGJY5F7TMMgDnkD3/a1r+pdOoP+xSlPqRnQGxgKsGXJ//Z"
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
