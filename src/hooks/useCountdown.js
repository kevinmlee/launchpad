"use client";

import { useState, useEffect } from 'react';

export default function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!targetDate) return;

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference <= 0) {
        return null;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds, total: difference };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (!newTimeLeft) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Format the countdown string
  const formatCountdown = () => {
    if (!timeLeft) return null;

    const { days, hours, minutes } = timeLeft;

    if (days > 0) {
      return `T-${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `T-${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `T-${minutes}m`;
    } else {
      return 'T-<1m';
    }
  };

  return {
    timeLeft,
    formatted: formatCountdown(),
    isImminent: timeLeft && timeLeft.total < 24 * 60 * 60 * 1000, // Less than 24 hours
    isVerySoon: timeLeft && timeLeft.total < 60 * 60 * 1000, // Less than 1 hour
  };
}
