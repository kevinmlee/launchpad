"use client";

import { useState } from "react";
import Chip from "../Chip/Chip";
import Card from "./Card";
import Modal from "../Modal/Modal";
import TimezoneToggle from "../TimezoneToggle/TimezoneToggle";
import FilterPills from "../FilterPills/FilterPills";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import isToday from "dayjs/plugin/isToday";

dayjs.extend(utc);
dayjs.extend(LocalizedFormat);
dayjs.extend(isToday);

export default function Cards({ launches, expeditions }) {
  const [selectedLaunch, setSelectedLaunch] = useState(null);
  const [useUTC, setUseUTC] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

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

  const launch = (post, index) => {
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
        index={index}
        onClick={() => setSelectedLaunch(launchData)}
      />
    );
  };

  const expedition = (post, index) => {
    let imageUrl = "";
    let agency = "";
    let missionType = "";

    if (post.mission_patches.length > 0) {
      imageUrl = post.mission_patches[0].image_url;
      agency = post.mission_patches[0].agency.name;
      missionType = post.mission_patches[0].agency.type;
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
        index={index}
        onClick={() => setSelectedLaunch(expeditionData)}
      />
    );
  };

  // Filter out past expeditions on the client side
  const filterActiveExpeditions = (expeditionsList) => {
    if (!expeditionsList || !("results" in expeditionsList)) return [];

    return expeditionsList.results.filter((post) => {
      const endDate = post.end ? dayjs(post.end) : null;
      return !endDate || endDate.isAfter(dayjs()) || endDate.isToday();
    });
  };

  // Apply quick filters to launches
  const filterLaunches = (launchList) => {
    if (!launchList || !("results" in launchList)) return [];

    return launchList.results.filter((post) => {
      const launchDate = dayjs(post.net || post.start);
      const launchStatus = post.status?.abbrev?.toLowerCase();
      const provider = post.launch_service_provider?.name?.toLowerCase() || "";

      switch (activeFilter) {
        case "today":
          return launchDate.isToday();
        case "week":
          const endOfWeek = dayjs().add(7, "day");
          return launchDate.isBefore(endOfWeek) && launchDate.isAfter(dayjs().subtract(1, "day"));
        case "spacex":
          return provider.includes("spacex");
        case "nasa":
          return provider.includes("nasa");
        case "upcoming":
          return !["success", "failure"].includes(launchStatus) && launchDate.isAfter(dayjs());
        default:
          return true;
      }
    });
  };

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 relative">
        <FilterPills onFilterChange={setActiveFilter} />
        <TimezoneToggle onTimezoneChange={setUseUTC} />
      </div>

      <div className="my-6">
        {launches &&
          filterLaunches(launches).map((post, index) => launch(post, index))}

        {expeditions &&
          "results" in expeditions &&
          filterActiveExpeditions(expeditions).map((post, index) => expedition(post, index))}
      </div>

      <Modal
        isOpen={!!selectedLaunch}
        onClose={() => setSelectedLaunch(null)}
        launch={selectedLaunch}
      />
    </>
  );
}
