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
}) {
  const imageClasses = imageStyle === "cover"
    ? "object-cover"
    : "object-contain";

  const imageContainerClasses = imageStyle === "cover"
    ? "relative sm:rounded-2xl overflow-hidden w-full h-48 md:h-full"
    : "relative sm:rounded-2xl overflow-hidden flex items-center justify-center w-full h-48 md:h-full";

  // Check if today is launch day
  const isToday = day === "Today";
  const dateBoxClasses = isToday
    ? "sm:rounded-2xl justify-center text-center text-black bg-[#edf8eb] py-4 sm:py-8 sm:px-6 w-full md:w-auto shadow-[0_0_20px_rgba(237,248,235,0.8)] animate-pulse"
    : "sm:rounded-2xl justify-center text-center text-black bg-[#edf8eb] py-4 sm:py-8 sm:px-6 w-full md:w-auto";

  return (
    <div className="grid grid-cols-1 md:grid-cols-[150px_1fr_150px] sm:p-6 mt-8 relative bg-black/40 rounded-2xl overflow-hidden shadow-[0_10px_15px_-3px_rgba(0,0,0,0.45)] transition-all duration-200 text-white hover:-translate-y-2.5 hover:bg-[#3c2ea9]">
      {/* Image - TOP on mobile, RIGHT on desktop */}
      <div className={`${imageContainerClasses} md:order-3`}>
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
      <div className="py-8 px-5 sm:p-5 md:order-2">
        <div>
          <h2 className="my-0 text-xl flex items-center mb-2.5 font-merriweather">{title}</h2>

          {chips && chips.length > 0 && (
            <div className="mb-2.5 [&>*:not(:last-child)]:mr-1.5">
              {chips}
            </div>
          )}

          {subtitle && <div className="mb-2.5 text-sm">{subtitle}</div>}

          {description && <div className="text-xs leading-tight">{description}</div>}
        </div>
      </div>

      {/* Date/Time Box - BOTTOM on mobile, LEFT on desktop */}
      <div className="flex items-center justify-center md:order-1">
        <div className={dateBoxClasses}>
          <div className="text-sm uppercase font-medium">{day}</div>
          {time && <div className="text-xl font-semibold mt-2.5">{time}</div>}
        </div>
      </div>
    </div>
  );
}
