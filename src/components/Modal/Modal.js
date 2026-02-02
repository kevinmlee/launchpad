"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

// Skeleton component for image loading
function ImageSkeleton() {
  return (
    <div className="absolute inset-0 bg-gray-100 dark:bg-[#1a1625] animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 dark:via-white/5 to-transparent skeleton-shimmer" />
    </div>
  );
}

export default function Modal({ isOpen, onClose, launch }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Reset image loaded state when launch changes
  useEffect(() => {
    setImageLoaded(false);
  }, [launch?.image]);

  // Handle open/close animations
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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

  if (!isVisible || !launch) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-out ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-sm transition-all duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-lg max-h-[90vh] overflow-hidden bg-white dark:bg-[#1c1828] rounded-xl border border-gray-200 dark:border-white/[0.08] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9)] transition-all duration-300 ease-out ${
          isAnimating
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-12'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        {launch.image && (
          <div className="relative w-full h-44 sm:h-56 bg-gray-100 dark:bg-[#141020]">
            {!imageLoaded && <ImageSkeleton />}

            <Image
              src={launch.image}
              alt={launch.title}
              fill
              className={`object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#1c1828] via-white/40 dark:via-[#1c1828]/40 to-transparent" />

            {/* Close button — over image */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 transition-colors text-white/70 hover:text-white backdrop-blur-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Close button fallback when no image */}
        {!launch.image && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/[0.06] hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-500 dark:text-white/50 hover:text-gray-700 dark:hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Content */}
        <div className="px-5 pb-6 pt-4 overflow-y-auto max-h-[50vh]">
          {/* Meta line */}
          <div className="flex items-center gap-1.5 text-xs mb-3">
            {launch.isPast ? (
              <>
                <span className={`font-medium ${launch.isFailed ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                  {launch.isFailed ? 'Failed' : launch.pastLabel || 'Launched'}
                </span>
                <span className="text-gray-300 dark:text-white/20">·</span>
                <span className="text-gray-400 dark:text-white/30">{launch.day}</span>
                {launch.time && (
                  <>
                    <span className="text-gray-300 dark:text-white/20">·</span>
                    <span className="text-gray-400 dark:text-white/30">{launch.time}</span>
                  </>
                )}
              </>
            ) : (
              <>
                <span className="text-indigo-600 dark:text-indigo-400 font-medium">{launch.day}</span>
                {launch.time && (
                  <>
                    <span className="text-gray-300 dark:text-white/20">·</span>
                    <span className="text-indigo-600/70 dark:text-indigo-400/70">{launch.time}</span>
                  </>
                )}
              </>
            )}
          </div>

          {/* Title */}
          <h2 className="text-lg sm:text-xl font-semibold font-merriweather text-gray-900 dark:text-white/90 leading-snug mb-3">
            {launch.title}
          </h2>

          {/* Chips */}
          {launch.chips && launch.chips.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {launch.chips}
            </div>
          )}

          {/* Subtitle */}
          {launch.subtitle && (
            <p className="text-gray-500 dark:text-white/40 text-sm mb-4">
              {launch.subtitle}
            </p>
          )}

          {/* Description */}
          {launch.description && (
            <div className="border-t border-gray-100 dark:border-white/[0.06] pt-4">
              <h3 className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-white/25 mb-2">Details</h3>
              <p className="text-gray-600 dark:text-white/50 text-sm leading-relaxed">
                {launch.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
