"use client";

import { useEffect } from 'react';
import Image from 'next/image';

export default function Modal({ isOpen, onClose, launch }) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !launch) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl bg-gradient-to-br from-space-blue to-space-dark border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white/70 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        {launch.image && (
          <div className="relative w-full h-48 sm:h-64">
            <Image
              src={launch.image}
              alt={launch.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-space-dark via-transparent to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {/* Date & Time */}
          <div className="flex items-center gap-2 text-sm text-indigo-400 mb-3">
            {launch.isPast && <span className="text-launched-badge font-semibold">✓ LAUNCHED</span>}
            <span>{launch.day}</span>
            {launch.time && <span>• {launch.time}</span>}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-merriweather text-white mb-4">
            {launch.title}
          </h2>

          {/* Chips */}
          {launch.chips && launch.chips.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {launch.chips}
            </div>
          )}

          {/* Subtitle */}
          {launch.subtitle && (
            <p className="text-white/80 text-sm mb-4">
              {launch.subtitle}
            </p>
          )}

          {/* Description */}
          {launch.description && (
            <div className="border-t border-white/10 pt-4">
              <h3 className="text-xs uppercase tracking-wider text-white/50 mb-2">Mission Details</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {launch.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
