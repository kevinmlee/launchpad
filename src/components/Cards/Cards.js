"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Chip from "../Chip/Chip";
import Card from "./Card";
import Modal from "../Modal/Modal";
import TimezoneToggle from "../TimezoneToggle/TimezoneToggle";
import NotificationToggle from "../NotificationToggle/NotificationToggle";
import Filters, { timeFilters, typeFilters } from "../Filters/Filters";
import BackToTop from "../BackToTop/BackToTop";
import useNotifications from "../../hooks/useNotifications";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import isToday from "dayjs/plugin/isToday";

dayjs.extend(utc);
dayjs.extend(LocalizedFormat);
dayjs.extend(isToday);

// Valid filter values for URL param validation
const validTimeFilters = timeFilters.map(f => f.id);
const validTypeFilters = typeFilters.map(f => f.id);

export default function Cards({ launches, expeditions, events }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Read initial values from URL params (with validation)
  const timeParam = searchParams.get("time");
  const typeParam = searchParams.get("type");

  const initialTimeFilter = validTimeFilters.includes(timeParam) ? timeParam : "all";
  const initialTypeFilter = validTypeFilters.includes(typeParam) ? typeParam : "all-types";

  const [selectedLaunch, setSelectedLaunch] = useState(null);
  const [useUTC, setUseUTC] = useState(false);
  const [activeFilter, setActiveFilter] = useState(initialTimeFilter);
  const [activeTypeFilter, setActiveTypeFilter] = useState(initialTypeFilter);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Update URL when filters change
  const updateURLParams = useCallback((time, type) => {
    const params = new URLSearchParams();

    // Only add params if they're not the default values
    if (time && time !== "all") {
      params.set("time", time);
    }
    if (type && type !== "all-types") {
      params.set("type", type);
    }

    const queryString = params.toString();
    const newURL = queryString ? `${pathname}?${queryString}` : pathname;

    // Use replace to avoid adding to browser history for every filter change
    router.replace(newURL, { scroll: false });
  }, [pathname, router]);

  // Handle filter changes
  const handleTimeFilterChange = (filterId) => {
    setActiveFilter(filterId);
    updateURLParams(filterId, activeTypeFilter);
  };

  const handleTypeFilterChange = (filterId) => {
    setActiveTypeFilter(filterId);
    updateURLParams(activeFilter, filterId);
  };

  // Sync state with URL params on mount and when URL changes
  useEffect(() => {
    setActiveFilter(initialTimeFilter);
    setActiveTypeFilter(initialTypeFilter);
  }, [initialTimeFilter, initialTypeFilter]);

  // Combine all items for notification checking
  const allItems = [
    ...(launches?.results || []),
    ...(expeditions?.results || []),
    ...(events?.results || []),
  ];

  // Hook that handles checking for imminent events and sending notifications
  useNotifications(allItems, notificationsEnabled);

  // Format date/time based on timezone preference
  const formatDate = (dateString) => {
    if (!dateString) return { day: null, time: null };
    const date = useUTC ? dayjs(dateString).utc() : dayjs(dateString);
    return {
      day: date.format("ll"),
      time: date.format("LT") + (useUTC ? " UTC" : ""),
    };
  };

  // Helper function to determine if a launch is in the past
  // Checks both date/time AND status (Success/Failure means it already happened)
  const checkIfPast = (dateString, status) => {
    // If status indicates completion, it's in the past
    const completedStatuses = ["success", "failure"];
    if (status && completedStatuses.includes(status.toLowerCase())) {
      return true;
    }

    if (!dateString) return false;
    const launchDate = dayjs(dateString);
    const now = dayjs();
    // Check if the full datetime (not just date) is in the past
    return launchDate.isBefore(now);
  };

  const status = (type) => {
    const green = ["success", "go", "active"];
    const yellow = ["tbc", "tbd"];
    const red = ["failure"];

    let color = "neutral";

    if (green.includes(type.toLowerCase())) color = "success";
    if (yellow.includes(type.toLowerCase())) color = "warning";
    if (red.includes(type.toLowerCase())) color = "danger";

    return (
      <Chip key="status" color={color} size="sm">
        {type}
      </Chip>
    );
  };

  const launch = (post) => {
    const launchDateRaw = post.net || post.start;
    const { day: formattedDay, time: formattedTime } = formatDate(launchDateRaw);

    const day = formattedDay;
    const time = formattedTime;

    // Determine if launch is in the past (by time or by status)
    const launchStatus = post.status?.abbrev?.toLowerCase();
    const isPast = checkIfPast(launchDateRaw, post.status?.abbrev);

    // Determine past label and failure state based on status
    const isSuccess = launchStatus === "success";
    const isFailed = launchStatus === "failure";
    const pastLabel = isSuccess ? "LAUNCHED" : isFailed ? "FAILED" : null;

    const chips = "mission" in post && post.mission ? [
      <Chip key="mission-type" color="neutral" size="sm">
        {post.mission.type}
      </Chip>,
      status(post.status.abbrev),
    ] : [];

    // Use default image if no launch image is available
    const finalImageUrl = post.image || "/default-launch.png";
    const displayDay = dayjs(day).isToday() ? "Today" : day;

    // Data to pass to modal
    const launchData = {
      day: displayDay,
      time,
      title: post.mission?.name || "No information available",
      chips,
      subtitle: post.launch_service_provider?.name && `LSP: ${post.launch_service_provider.name}`,
      description: post.mission?.description,
      image: finalImageUrl,
      isPast: isPast && (isSuccess || isFailed), // Only show past indicator for definitive outcomes
      isFailed,
      pastLabel,
      launchDate: launchDateRaw,
    };

    return (
      <Card
        key={post.id}
        {...launchData}
        imageStyle="cover"
        onClick={() => setSelectedLaunch(launchData)}
      />
    );
  };

  const expedition = (post) => {
    // Get agency info from first crew member if available
    let agency = "";
    if (post.crew && post.crew.length > 0) {
      const firstAstronaut = post.crew[0]?.astronaut;
      if (firstAstronaut?.agency?.name) {
        agency = firstAstronaut.agency.name;
      }
    }

    // Use default image for expeditions
    const finalImageUrl = "/default-expedition.png";
    const finalImageStyle = "cover";

    const { day: formattedDay, time: formattedTime } = formatDate(post.start);
    const displayDay = dayjs(post.start).isToday() ? "Today" : formattedDay;

    // Show crew count as chip if available
    const chips = post.crew && post.crew.length > 0 ? [
      <Chip key="crew-count" color="neutral" size="sm">
        {post.crew.length} Crew
      </Chip>,
    ] : [];

    // Data to pass to modal
    // Don't show isPast indicator for expeditions - they don't have clear completion status
    const expeditionData = {
      day: displayDay,
      time: formattedTime,
      title: post.name,
      chips,
      subtitle: post.spacestation?.name ? `Station: ${post.spacestation.name}` : null,
      description: agency ? `Agency: ${agency}` : null,
      image: finalImageUrl,
      isPast: false,
      launchDate: post.start,
    };

    return (
      <Card
        key={post.id}
        {...expeditionData}
        imageStyle={finalImageStyle}
        onClick={() => setSelectedLaunch(expeditionData)}
      />
    );
  };

  const event = (post) => {
    // Get image from image object or use default
    const imageUrl = post.image?.image_url || "/default-event.png";
    const finalImageStyle = "cover";

    const { day: formattedDay, time: formattedTime } = formatDate(post.date);
    const displayDay = dayjs(post.date).isToday() ? "Today" : formattedDay;

    // Event type chip - handle object format from API v2.3.0
    const eventType = post.type;
    const eventTypeName = typeof eventType === "object" ? eventType.name : eventType;

    const chips = eventTypeName ? [
      <Chip key="event-type" color="neutral" size="sm">
        {eventTypeName}
      </Chip>,
    ] : [];

    // Data to pass to modal
    // Don't show isPast indicator for events - they don't have clear completion status
    const eventData = {
      day: displayDay,
      time: formattedTime,
      title: post.name,
      chips,
      subtitle: post.location && `Location: ${post.location}`,
      description: post.description,
      image: imageUrl,
      isPast: false,
      launchDate: post.date,
    };

    return (
      <Card
        key={post.id}
        {...eventData}
        imageStyle={finalImageStyle}
        onClick={() => setSelectedLaunch(eventData)}
      />
    );
  };

  // Apply time filter to a date
  const applyTimeFilter = (dateString) => {
    if (!dateString) return true;
    const date = dayjs(dateString);

    switch (activeFilter) {
      case "today":
        return date.isToday();
      case "week":
        const endOfWeek = dayjs().add(7, "day");
        return date.isBefore(endOfWeek) && date.isAfter(dayjs().subtract(1, "day"));
      case "upcoming":
        return date.isAfter(dayjs());
      default:
        return true;
    }
  };

  // Filter out past expeditions on the client side
  const filterActiveExpeditions = (expeditionsList) => {
    if (!expeditionsList || !("results" in expeditionsList)) return [];

    return expeditionsList.results.filter((post) => {
      // Only show expeditions with start dates today or in the future
      const startDate = dayjs(post.start);
      if (startDate.isBefore(dayjs(), 'day') && !startDate.isToday()) {
        return false;
      }
      return applyTimeFilter(post.start);
    });
  };

  // Filter events
  const filterEvents = (eventsList) => {
    if (!eventsList || !("results" in eventsList)) return [];
    return eventsList.results.filter((post) => applyTimeFilter(post.date));
  };

  // Apply quick filters to launches
  const filterLaunches = (launchList) => {
    if (!launchList || !("results" in launchList)) return [];

    return launchList.results.filter((post) => {
      const launchStatus = post.status?.abbrev?.toLowerCase();

      // Apply time filter
      if (!applyTimeFilter(post.net || post.start)) return false;

      // For "upcoming" filter, also check status
      if (activeFilter === "upcoming") {
        return !["success", "failure"].includes(launchStatus);
      }

      return true;
    });
  };

  // Check if content type should be shown
  const showLaunches = activeTypeFilter === "all-types" || activeTypeFilter === "launches";
  const showExpeditions = activeTypeFilter === "all-types" || activeTypeFilter === "expeditions";
  const showEvents = activeTypeFilter === "all-types" || activeTypeFilter === "events";

  // Combine and sort all items by date
  const getSortedItems = () => {
    const items = [];

    // Add launches with type marker
    if (showLaunches && launches) {
      filterLaunches(launches).forEach((post) => {
        items.push({
          type: "launch",
          date: post.net || post.start,
          data: post,
        });
      });
    }

    // Add expeditions with type marker
    if (showExpeditions && expeditions) {
      filterActiveExpeditions(expeditions).forEach((post) => {
        items.push({
          type: "expedition",
          date: post.start,
          data: post,
        });
      });
    }

    // Add events with type marker
    if (showEvents && events) {
      filterEvents(events).forEach((post) => {
        items.push({
          type: "event",
          date: post.date,
          data: post,
        });
      });
    }

    // Sort by date (earliest first)
    return items.sort((a, b) => {
      const dateA = a.date ? dayjs(a.date) : dayjs().add(100, "year");
      const dateB = b.date ? dayjs(b.date) : dayjs().add(100, "year");
      return dateA.valueOf() - dateB.valueOf();
    });
  };

  const sortedItems = getSortedItems();

  // Render the appropriate card based on type
  const renderItem = (item) => {
    switch (item.type) {
      case "launch":
        return launch(item.data);
      case "expedition":
        return expedition(item.data);
      case "event":
        return event(item.data);
      default:
        return null;
    }
  };

  return (
    <>
      {/* Filter bar - sticky on scroll */}
      <div className="sticky top-0 sticky-safe-top z-40 py-4 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Filters
            onFilterChange={handleTimeFilterChange}
            onTypeFilterChange={handleTypeFilterChange}
            initialTimeFilter={activeFilter}
            initialTypeFilter={activeTypeFilter}
          />
          <div className="flex items-center gap-2">
            <NotificationToggle onNotificationChange={setNotificationsEnabled} />
            <TimezoneToggle onTimezoneChange={setUseUTC} />
          </div>
        </div>
      </div>

      <div className="my-6">
        {sortedItems.map((item) => renderItem(item))}
      </div>

      <Modal
        isOpen={!!selectedLaunch}
        onClose={() => setSelectedLaunch(null)}
        launch={selectedLaunch}
      />

      <BackToTop />
    </>
  );
}
