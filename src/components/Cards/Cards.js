"use client";

import { useState } from "react";
import Chip from "../Chip/Chip";
import Card from "./Card";
import Modal from "../Modal/Modal";

import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import isToday from "dayjs/plugin/isToday";

dayjs.extend(LocalizedFormat);
dayjs.extend(isToday);

export default function Cards({ launches, expeditions }) {
  const [selectedLaunch, setSelectedLaunch] = useState(null);

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
    const postNetDay = post.net && dayjs(post.net).format("ll");
    const postNetTime = post.net && dayjs(post.net).format("LT");

    const postStartDay = post.start && dayjs(post.start).format("ll");
    const postStartTime = post.start && dayjs(post.start).format("LT");

    const day = postNetDay ? postNetDay : postStartDay;
    const time = postNetTime ? postNetTime : postStartTime;

    // Determine if launch is in the past (by time or by status)
    const launchDate = post.net || post.start;
    const launchStatus = post.status?.abbrev;
    const isPast = checkIfPast(launchDate, launchStatus);

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
      missionType = post.mission_patches[0].agency.type;
    }

    // Use default image if no mission patch image is available
    const finalImageUrl = imageUrl || "/default-expedition.png";
    const finalImageStyle = imageUrl ? "contain" : "cover";

    const postStartDay = post.start && dayjs(post.start).format("ll");
    const postStartTime = post.start && dayjs(post.start).format("LT");

    // Determine if expedition is in the past
    const isPast = checkIfPast(post.start);
    const displayDay = dayjs(postStartDay).isToday() ? "Today" : postStartDay;

    const chips = missionType ? [
      <Chip key="mission-type" color="neutral" size="sm">
        {missionType}
      </Chip>,
    ] : [];

    // Data to pass to modal
    const expeditionData = {
      day: displayDay,
      time: postStartTime,
      title: post.name,
      chips,
      subtitle: `Station: ${post.spacestation.name}`,
      description: agency && `Agency: ${agency}`,
      image: finalImageUrl,
      isPast,
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

  // Filter out past expeditions on the client side
  const filterActiveExpeditions = (expeditionsList) => {
    if (!expeditionsList || !("results" in expeditionsList)) return [];

    return expeditionsList.results.filter((post) => {
      const endDate = post.end ? dayjs(post.end) : null;
      return !endDate || endDate.isAfter(dayjs()) || endDate.isToday();
    });
  };

  return (
    <>
      <div className="my-6">
        {launches &&
          "results" in launches &&
          launches.results.map((post) => launch(post))}

        {expeditions &&
          "results" in expeditions &&
          filterActiveExpeditions(expeditions).map((post) => expedition(post))}
      </div>

      <Modal
        isOpen={!!selectedLaunch}
        onClose={() => setSelectedLaunch(null)}
        launch={selectedLaunch}
      />
    </>
  );
}
