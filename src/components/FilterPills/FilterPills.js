"use client";

import { useState } from "react";

const filters = [
  { id: "all", label: "All" },
  { id: "today", label: "Today" },
  { id: "week", label: "This Week" },
  { id: "spacex", label: "SpaceX" },
  { id: "nasa", label: "NASA" },
  { id: "upcoming", label: "Upcoming" },
];

export default function FilterPills({ onFilterChange }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
    onFilterChange?.(filterId);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => handleFilterClick(filter.id)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
            activeFilter === filter.id
              ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
              : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white/80"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
