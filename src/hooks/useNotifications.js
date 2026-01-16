"use client";

/**
 * useNotifications Hook - Browser Notification System
 *
 * This hook provides "Happening Now!" notifications for launches, expeditions, and events.
 *
 * How it works:
 * 1. User clicks the notification toggle button in the UI
 * 2. Browser prompts for notification permission (if not already granted/denied)
 * 3. If granted, preference is saved to localStorage (launchpad_notifications_enabled)
 * 4. This hook runs every 30 seconds checking if any event is within ±5 minutes of happening
 * 5. When an event is imminent, a native browser notification appears with the event name
 * 6. Each event only triggers one notification (tracked in localStorage with timestamps)
 *
 * localStorage keys used:
 * - launchpad_notifications_enabled: boolean - user's notification preference
 * - launchpad_notified_items: object - map of item IDs to timestamps for deduplication
 *
 * Cleanup:
 * - Notified items older than 24 hours are automatically cleaned up
 * - Cleanup runs on every read operation and is persisted back to localStorage
 *
 * Note: User must keep the page open to receive notifications.
 */

import { useEffect, useRef, useCallback } from "react";

const NOTIFIED_KEY = "launchpad_notified_items";
const CLEANUP_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours

// Get the map of already notified item IDs from localStorage
// Also performs cleanup of entries older than 24 hours
function getNotifiedItems() {
  if (typeof window === "undefined") return new Map();
  try {
    const stored = localStorage.getItem(NOTIFIED_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      const now = Date.now();
      const filtered = Object.entries(parsed).filter(
        ([_, timestamp]) => now - timestamp < CLEANUP_AGE_MS
      );
      return new Map(filtered);
    }
  } catch {
    // Ignore errors
  }
  return new Map();
}

// Persist the notified items map to localStorage (also cleans up old entries)
function saveNotifiedItems(notifiedMap) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(NOTIFIED_KEY, JSON.stringify(Object.fromEntries(notifiedMap)));
  } catch {
    // Ignore errors (e.g., localStorage full)
  }
}

// Save notified item ID with timestamp
function markAsNotified(id) {
  const notified = getNotifiedItems();
  notified.set(String(id), Date.now());
  saveNotifiedItems(notified);
}

// Check if an item has already been notified
function hasBeenNotified(id) {
  const notified = getNotifiedItems();
  return notified.has(String(id));
}

// Run cleanup and persist to localStorage
function cleanupNotifiedItems() {
  const notified = getNotifiedItems(); // This filters out old entries
  saveNotifiedItems(notified); // Persist the cleaned-up version
}

// Send a browser notification
function sendNotification(title, body, icon = "/favicon.ico") {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission !== "granted") return;

  try {
    new Notification(title, { body, icon });
  } catch {
    // Fallback for some browsers that require service worker
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

  // Cleanup old entries on mount
  useEffect(() => {
    cleanupNotifiedItems();
  }, []);

  useEffect(() => {
    if (!notificationsEnabled) return;

    // Check immediately
    checkAndNotify();

    // Check every 30 seconds
    const interval = setInterval(checkAndNotify, 30 * 1000);

    return () => clearInterval(interval);
  }, [checkAndNotify, notificationsEnabled]);
}
