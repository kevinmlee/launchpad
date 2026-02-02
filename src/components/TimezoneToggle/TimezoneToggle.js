"use client";

import { useState, useEffect } from "react";

export default function TimezoneToggle({ onTimezoneChange }) {
  const [isUTC, setIsUTC] = useState(false);
  const [localTz, setLocalTz] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Get the local timezone abbreviation
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setLocalTz(tz.split("/").pop().replace("_", " "));
  }, []);

  const handleToggle = () => {
    const newValue = !isUTC;
    setIsUTC(newValue);
    onTimezoneChange?.(newValue);
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/15 dark:hover:border-white/20 transition-all text-sm !w-fit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 text-gray-400 dark:text-white/60"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <span className={`transition-colors ${isUTC ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-white/60'}`}>
          {isUTC ? "UTC" : localTz}
        </span>
        <div className="relative w-8 h-4 bg-black/10 dark:bg-white/10 rounded-full">
          <div
            className={`absolute top-0.5 w-3 h-3 bg-indigo-500 dark:bg-indigo-400 rounded-full transition-transform ${
              isUTC ? 'translate-x-4' : 'translate-x-0.5'
            }`}
          />
        </div>
      </button>

      {/* Tooltip - hidden on mobile, responsive positioning */}
      {showTooltip && (
        <div className="hidden sm:block absolute bottom-full right-0 mb-2 px-3 py-2 bg-white dark:bg-[#1a1625] border border-gray-200 dark:border-white/20 rounded-lg text-xs text-gray-600 dark:text-white/80 whitespace-nowrap z-50 shadow-lg">
          Switch between your local timezone and UTC
          <div className="absolute top-full right-4 border-4 border-transparent border-t-white dark:border-t-[#1a1625]" />
        </div>
      )}
    </div>
  );
}
