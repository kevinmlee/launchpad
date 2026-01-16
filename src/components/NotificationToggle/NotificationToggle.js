"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "launchpad_notifications_enabled";

export default function NotificationToggle({ onNotificationChange }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [permission, setPermission] = useState("default");
  const [isSupported, setIsSupported] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Check if notifications are supported
    const supported = typeof window !== "undefined" && "Notification" in window;
    setIsSupported(supported);

    if (supported) {
      setPermission(Notification.permission);

      // Load saved preference from localStorage
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        const savedEnabled = JSON.parse(saved);
        // Only enable if permission is granted
        if (savedEnabled && Notification.permission === "granted") {
          setIsEnabled(true);
          onNotificationChange?.(true);
        }
      }
    }
  }, []);

  const handleToggle = async () => {
    if (!isSupported) return;

    if (!isEnabled) {
      // Trying to enable notifications
      if (Notification.permission === "default") {
        // Need to request permission
        const result = await Notification.requestPermission();
        setPermission(result);

        if (result === "granted") {
          setIsEnabled(true);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(true));
          onNotificationChange?.(true);

          // Show a test notification
          new Notification("Launchpad Notifications Enabled! 🚀", {
            body: "You'll be notified when launches are happening now!",
            icon: "/favicon.ico",
          });
        }
      } else if (Notification.permission === "granted") {
        setIsEnabled(true);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(true));
        onNotificationChange?.(true);
      }
      // If permission is "denied", we can't do anything
    } else {
      // Disabling notifications
      setIsEnabled(false);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(false));
      onNotificationChange?.(false);
    }
  };

  // Don't render if notifications aren't supported
  if (!isSupported) {
    return null;
  }

  const isDisabled = permission === "denied";

  const getTooltipText = () => {
    if (permission === "denied") {
      return "Notifications are blocked. Enable them in your browser settings.";
    }
    return "Get notified when launches are happening. Keep the page open to receive alerts.";
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        disabled={isDisabled}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 transition-all text-sm !w-fit ${
          isDisabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-white/10 hover:border-white/20"
        }`}
      >
        {/* Bell icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-4 h-4 ${isEnabled ? 'text-indigo-400' : 'text-white/60'}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
          />
        </svg>
        <span className={`transition-colors ${isEnabled ? 'text-indigo-400' : 'text-white/60'}`}>
          Notifications
        </span>
        <div className={`relative w-8 h-4 rounded-full ${isDisabled ? 'bg-white/5' : 'bg-white/10'}`}>
          <div
            className={`absolute top-0.5 w-3 h-3 rounded-full transition-transform ${
              isEnabled ? 'translate-x-4 bg-indigo-400' : 'translate-x-0.5 bg-white/30'
            }`}
          />
        </div>
      </button>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#1a1625] border border-white/20 rounded-lg text-xs text-white/80 whitespace-nowrap z-50 shadow-lg">
          {getTooltipText()}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1a1625]" />
        </div>
      )}
    </div>
  );
}
