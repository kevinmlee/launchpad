"use client";

import { useState, useEffect } from "react";

export default function TimezoneToggle({ onTimezoneChange }) {
  const [isUTC, setIsUTC] = useState(false);
  const [localTz, setLocalTz] = useState("");

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
    <button
      onClick={handleToggle}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-sm"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4 text-white/60"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
      <span className={`transition-colors ${isUTC ? 'text-indigo-400' : 'text-white/60'}`}>
        {isUTC ? "UTC" : localTz}
      </span>
      <div className="relative w-8 h-4 bg-white/10 rounded-full">
        <div
          className={`absolute top-0.5 w-3 h-3 bg-indigo-400 rounded-full transition-transform ${
            isUTC ? 'translate-x-4' : 'translate-x-0.5'
          }`}
        />
      </div>
    </button>
  );
}
