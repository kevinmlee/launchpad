"use client";

import { useState, useRef, useEffect } from "react";

export const timeFilters = [
  { id: "all", label: "All Times" },
  { id: "today", label: "Today" },
  { id: "week", label: "This Week" },
  { id: "upcoming", label: "Upcoming" },
];

export const typeFilters = [
  { id: "all-types", label: "All Types" },
  { id: "launches", label: "Launches" },
  { id: "expeditions", label: "Expeditions" },
  { id: "events", label: "Events" },
];

function FilterDropdown({ label, options, value, onChange, color = "indigo" }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find((opt) => opt.id === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const colorClasses = {
    indigo: {
      button: "hover:border-indigo-400/50",
      active: "bg-indigo-500/20 border-indigo-400/50",
      dropdown: "border-indigo-500/30",
      option: "hover:bg-indigo-500/20",
      selected: "bg-indigo-500/30 text-indigo-300",
    },
    violet: {
      button: "hover:border-violet-400/50",
      active: "bg-violet-500/20 border-violet-400/50",
      dropdown: "border-violet-500/30",
      option: "hover:bg-violet-500/20",
      selected: "bg-violet-500/30 text-violet-300",
    },
  };

  const colors = colorClasses[color];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
          bg-white/5 border border-white/10 text-white/80
          ${isOpen ? colors.active : colors.button}`}
      >
        <span className="text-white/50">{label}:</span>
        <span>{selectedOption?.label}</span>
        <svg
          className={`w-4 h-4 text-white/50 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className={`absolute top-full left-0 mt-1 min-w-full bg-[#1a1625] border ${colors.dropdown} rounded-lg shadow-xl z-50 overflow-hidden`}>
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                onChange(option.id);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm transition-colors
                ${value === option.id ? colors.selected : `text-white/70 ${colors.option}`}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Filters({
  onFilterChange,
  onTypeFilterChange,
  initialTimeFilter = "all",
  initialTypeFilter = "all-types"
}) {
  const [activeFilter, setActiveFilter] = useState(initialTimeFilter);
  const [activeTypeFilter, setActiveTypeFilter] = useState(initialTypeFilter);

  // Sync with initial values when they change (e.g., from URL params)
  useEffect(() => {
    setActiveFilter(initialTimeFilter);
  }, [initialTimeFilter]);

  useEffect(() => {
    setActiveTypeFilter(initialTypeFilter);
  }, [initialTypeFilter]);

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    onFilterChange?.(filterId);
  };

  const handleTypeFilterChange = (filterId) => {
    setActiveTypeFilter(filterId);
    onTypeFilterChange?.(filterId);
  };

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <FilterDropdown
        label="Type"
        options={typeFilters}
        value={activeTypeFilter}
        onChange={handleTypeFilterChange}
        color="indigo"
      />
      <FilterDropdown
        label="Time"
        options={timeFilters}
        value={activeFilter}
        onChange={handleFilterChange}
        color="violet"
      />
    </div>
  );
}
