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
    ? "relative rounded-2xl overflow-hidden h-full w-full"
    : "relative rounded-2xl overflow-hidden flex items-center justify-center h-full w-full";

  return (
    <div className="grid grid-cols-[150px_1fr_150px] p-6 mt-8 relative bg-black/40 rounded-2xl overflow-hidden shadow-[0_10px_15px_-3px_rgba(0,0,0,0.45)] transition-all duration-200 text-white hover:-translate-y-2.5 hover:bg-[#3c2ea9]">
      {/* Date/Time Box - LEFT Column */}
      <div className="flex items-center">
        <div className="rounded-2xl justify-center text-center text-black bg-[#edf8eb] py-8 px-6">
          <div className="text-sm uppercase font-medium">{day}</div>
          {time && <div className="text-xl font-semibold mt-2.5">{time}</div>}
        </div>
      </div>

      {/* Mission Details - MIDDLE Column */}
      <div className="p-5">
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

      {/* Image - RIGHT Column */}
      <div className={imageContainerClasses}>
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            sizes="150px"
            className={imageClasses}
          />
        )}
      </div>
    </div>
  );
}
