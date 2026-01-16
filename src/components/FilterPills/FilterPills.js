"use client";

import { useState } from "react";

const timeFilters = [
  { id: "all", label: "All" },
  { id: "today", label: "Today" },
  { id: "week", label: "This Week" },
  { id: "upcoming", label: "Upcoming" },
];

const typeFilters = [
  { id: "all-types", label: "All Types" },
  { id: "launches", label: "Launches" },
  { id: "expeditions", label: "Expeditions" },
  { id: "events", label: "Events" },
];

export default function FilterPills({ onFilterChange, onTypeFilterChange }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeTypeFilter, setActiveTypeFilter] = useState("all-types");

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
    onFilterChange?.(filterId);
  };

  const handleTypeFilterClick = (filterId) => {
    setActiveTypeFilter(filterId);
    onTypeFilterChange?.(filterId);
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {/* Type filters */}
      {typeFilters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => handleTypeFilterClick(filter.id)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
            activeTypeFilter === filter.id
              ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
              : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white/80"
          }`}
        >
          {filter.label}
        </button>
      ))}

      {/* Divider */}
      <div className="w-px h-6 bg-white/20 mx-1" />

      {/* Time filters */}
      {timeFilters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => handleFilterClick(filter.id)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
            activeFilter === filter.id
              ? "bg-violet-500 text-white shadow-lg shadow-violet-500/25"
              : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white/80"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
