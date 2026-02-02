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
  isFailed = false,
  launchDate,
  onClick,
}) {
  const imageClasses = imageStyle === "cover"
    ? "object-cover"
    : "object-contain";

  const isToday = day === "Today";
  const { formatted: countdown, isImminent, isVerySoon } = useCountdown(isPast ? null : launchDate);

  // Status indicator dot
  const StatusDot = () => {
    if (isPast) return null;

    if (isVerySoon) {
      return (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
        </span>
      );
    }

    if (isImminent || isToday) {
      return (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
        </span>
      );
    }

    return null;
  };

  return (
    <article
      className={`group flex items-start gap-4 md:gap-5 py-4 md:py-5 cursor-pointer transition-colors duration-200 border-b ${
        isPast
          ? 'border-white/5 opacity-60'
          : 'border-white/[0.07] hover:bg-white/[0.03]'
      }`}
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className={`relative shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden ${isPast ? 'grayscale-[30%]' : ''}`}>
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 64px, 80px"
            className={`${imageClasses} transition-transform duration-300 group-hover:scale-105`}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMH/8QAIhAAAgEDAwUBAAAAAAAAAAAAAQIDAAQRBRIhBhMiMUFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEEA/ANT6d1K0sdJtLW6WdbiGJY5F7TMMgDnkD3/a1r+pdOoP+xSlPqRnQGxgKsGXJ//Z"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Meta row: date + countdown */}
        <div className="flex items-center gap-1.5 mb-1">
          <StatusDot />
          {isPast ? (
            <>
              <span className={`text-xs font-medium ${isFailed ? 'text-red-400' : 'text-emerald-400'}`}>
                {isFailed ? 'Failed' : 'Launched'}
              </span>
              <span className="text-white/25 text-xs">·</span>
              <span className="text-xs text-white/30">{day}</span>
            </>
          ) : (
            <>
              <span className={`text-xs font-medium ${isToday ? 'text-indigo-400' : 'text-white/40'}`}>{day}</span>
              {time && (
                <>
                  <span className="text-white/20 text-xs">·</span>
                  <span className={`text-xs ${isToday ? 'text-indigo-400/70' : 'text-white/30'}`}>{time}</span>
                </>
              )}
              {countdown && (
                <span className={`text-[10px] font-mono ml-1 px-1.5 py-px rounded ${
                  isVerySoon
                    ? 'bg-red-500/15 text-red-400'
                    : isImminent
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'bg-white/5 text-white/30'
                }`}>
                  {countdown}
                </span>
              )}
            </>
          )}
        </div>

        {/* Title */}
        <h2 className={`text-sm md:text-[15px] font-semibold leading-snug mb-1 font-merriweather truncate ${
          isPast ? 'text-white/40' : 'text-white/90 group-hover:text-white'
        }`}>
          {title}
        </h2>

        {/* Chips + subtitle inline */}
        <div className="flex items-center gap-2 flex-wrap">
          {chips && chips.length > 0 && (
            <div className={`flex items-center gap-1 ${isPast ? 'opacity-50' : ''}`}>
              {chips}
            </div>
          )}
          {subtitle && (
            <span className={`text-xs ${isPast ? 'text-white/25' : 'text-white/35'}`}>
              {subtitle}
            </span>
          )}
        </div>

        {/* Description - desktop only */}
        {description && (
          <p className={`hidden md:block text-xs leading-relaxed mt-1.5 line-clamp-1 ${
            isPast ? 'text-white/20' : 'text-white/30'
          }`}>
            {description}
          </p>
        )}
      </div>

      {/* Right arrow indicator */}
      <div className={`shrink-0 self-center transition-transform duration-200 group-hover:translate-x-0.5 ${
        isPast ? 'text-white/10' : 'text-white/15 group-hover:text-white/30'
      }`}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </article>
  );
}
