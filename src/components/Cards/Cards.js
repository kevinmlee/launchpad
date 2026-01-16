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
    const launchStatus = post.status?.abbrev;
    const isPast = checkIfPast(launchDateRaw, launchStatus);

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
      isPast,
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
    let imageUrl = "";
    let agency = "";
    let missionType = "";

    if (post.mission_patches.length > 0) {
      imageUrl = post.mission_patches[0].image_url;
      agency = post.mission_patches[0].agency.name;
      // API v2.3.0 returns type as object {id, name} instead of string
      const agencyType = post.mission_patches[0].agency.type;
      missionType = typeof agencyType === "object" ? agencyType.name : agencyType;
    }

    // Use default image if no mission patch image is available
    const finalImageUrl = imageUrl || "/default-expedition.png";
    const finalImageStyle = imageUrl ? "contain" : "cover";

    const { day: formattedDay, time: formattedTime } = formatDate(post.start);

    // Determine if expedition is in the past
    const isPast = checkIfPast(post.start);
    const displayDay = dayjs(post.start).isToday() ? "Today" : formattedDay;

    const chips = missionType ? [
      <Chip key="mission-type" color="neutral" size="sm">
        {missionType}
      </Chip>,
    ] : [];

    // Data to pass to modal
    const expeditionData = {
      day: displayDay,
      time: formattedTime,
      title: post.name,
      chips,
      subtitle: `Station: ${post.spacestation.name}`,
      description: agency && `Agency: ${agency}`,
      image: finalImageUrl,
      isPast,
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
    // Get image from the image object or use default
    const imageUrl = post.image?.image_url || "/default-event.png";
    const finalImageStyle = post.image?.image_url ? "cover" : "cover";

    const { day: formattedDay, time: formattedTime } = formatDate(post.date);

    // Determine if event is in the past
    const isPast = checkIfPast(post.date);
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
    const eventData = {
      day: displayDay,
      time: formattedTime,
      title: post.name,
      chips,
      subtitle: post.location && `Location: ${post.location}`,
      description: post.description,
      image: imageUrl,
      isPast,
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
      const endDate = post.end ? dayjs(post.end) : null;
      const isActive = !endDate || endDate.isAfter(dayjs()) || endDate.isToday();
      return isActive && applyTimeFilter(post.start);
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

  return (
    <>
      {/* Filter bar - sticky on scroll */}
      <div className="sticky top-0 z-40 py-4 backdrop-blur-sm">
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
        {showLaunches && launches &&
          filterLaunches(launches).map((post) => launch(post))}

        {showExpeditions && expeditions &&
          "results" in expeditions &&
          filterActiveExpeditions(expeditions).map((post) => expedition(post))}

        {showEvents && events &&
          "results" in events &&
          filterEvents(events).map((post) => event(post))}
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
