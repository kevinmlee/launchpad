"use client";

import { useEffect, useRef, useCallback } from "react";

const NOTIFIED_KEY = "launchpad_notified_items";

// Get the set of already notified item IDs from localStorage
function getNotifiedItems() {
  if (typeof window === "undefined") return new Set();
  try {
    const stored = localStorage.getItem(NOTIFIED_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Clean up old entries (older than 24 hours)
      const now = Date.now();
      const filtered = Object.entries(parsed).filter(
        ([_, timestamp]) => now - timestamp < 24 * 60 * 60 * 1000
      );
      return new Map(filtered);
    }
  } catch {
    // Ignore errors
  }
  return new Map();
}

// Save notified item ID with timestamp
function markAsNotified(id) {
  if (typeof window === "undefined") return;
  try {
    const notified = getNotifiedItems();
    notified.set(id, Date.now());
    localStorage.setItem(NOTIFIED_KEY, JSON.stringify(Object.fromEntries(notified)));
  } catch {
    // Ignore errors
  }
}

// Check if an item has already been notified
function hasBeenNotified(id) {
  const notified = getNotifiedItems();
  return notified.has(String(id));
}

// Send a browser notification
function sendNotification(title, body, icon = "/favicon.ico") {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission !== "granted") return;

  try {
    new Notification(title, { body, icon });
  } catch {
    // Fallback for some browsers
    if (navigator.serviceWorker?.ready) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(title, { body, icon });
      });
    }
  }
}

export default function useNotifications(items, notificationsEnabled) {
  const checkedRef = useRef(new Set());

  const checkAndNotify = useCallback(() => {
    if (!notificationsEnabled || !items || items.length === 0) return;

    const now = Date.now();

    items.forEach((item) => {
      const id = String(item.id);
      const launchDate = item.net || item.start || item.date;
      if (!launchDate) return;

      const targetTime = new Date(launchDate).getTime();
      const timeUntil = targetTime - now;

      // Skip if already notified or if we've checked this item this session
      if (hasBeenNotified(id)) return;

      // Notify when event is happening now (within 5 minutes before to 5 minutes after)
      // This gives a window for the "Happening Now!" notification
      const fiveMinutes = 5 * 60 * 1000;

      if (timeUntil <= fiveMinutes && timeUntil >= -fiveMinutes) {
        // Skip if we've already processed this item in this session
        if (checkedRef.current.has(id)) return;
        checkedRef.current.add(id);

        const title = item.mission?.name || item.name || "Space Event";
        const eventType = item.mission ? "Launch" : (item.spacestation ? "Expedition" : "Event");

        sendNotification(
          "🚀 Happening Now!",
          `${eventType}: ${title}`,
          item.image || "/favicon.ico"
        );

        markAsNotified(id);
      }
    });
  }, [items, notificationsEnabled]);

  useEffect(() => {
    if (!notificationsEnabled) return;

    // Check immediately
    checkAndNotify();

    // Check every 30 seconds
    const interval = setInterval(checkAndNotify, 30 * 1000);

    return () => clearInterval(interval);
  }, [checkAndNotify, notificationsEnabled]);
}
