"use client";

import Chip from "../Chip/Chip";

import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import isToday from "dayjs/plugin/isToday";

dayjs.extend(LocalizedFormat);
dayjs.extend(isToday);

export default function Cards({ launches, expeditions }) {
  const status = (type) => {
    const green = ["success", "go", "active"];
    const yellow = ["tbc", "tbd"];
    const red = ["failure"];

    let color = "neutral";

    if (green.includes(type.toLowerCase())) color = "success";
    if (yellow.includes(type.toLowerCase())) color = "warning";
    if (red.includes(type.toLowerCase())) color = "danger";

    return (
      <Chip color={color} size="sm" className="!bg-[#6f737c]">
        {type}
      </Chip>
    );
  };

  const launch = (post) => {
    const postNetDay = post.net && dayjs(post.net).format("ll");
    const postNetTime = post.net && dayjs(post.net).format("LT");

    const postStartDay = post.start && dayjs(post.net).format("ll");
    const postStartTime = post.start && dayjs(post.net).format("LT");

    const day = postNetDay ? postNetDay : postStartDay;

      return (
      <div
        className="grid grid-cols-[150px_1fr_150px] p-6 mt-8 relative bg-black/40 rounded-2xl overflow-hidden shadow-[0_10px_15px_-3px_rgba(0,0,0,0.45)] transition-all duration-200 text-white hover:-translate-y-2.5 hover:bg-[#3c2ea9]"
        key={post.id}
      >
        {/* Date/Time Box - LEFT Column */}
        <div className="flex items-center">
          <div className="rounded-2xl justify-center text-center text-black bg-[#edf8eb] py-8 px-6">
            <div className="text-sm uppercase font-medium">{dayjs(day).isToday() ? "Today" : day}</div>
            <div className="text-xl font-semibold mt-2.5">
              {postNetTime ? postNetTime : postStartTime}
            </div>
          </div>
        </div>

        {/* Mission Details - MIDDLE Column */}
        <div className="p-5">
          {"mission" in post && post.mission ? (
            <div>
              <h2 className="my-0 flex items-center mb-2.5">{post.mission.name}</h2>

              <div className="mb-2.5 [&>*:not(:last-child)]:mr-1.5">
                {"mission" in post && post.mission && (
                  <Chip color="neutral" size="sm">
                    {post.mission.type}
                  </Chip>
                )}

                {status(post.status.abbrev)}
              </div>

              <div className="mb-2.5 text-sm">LSP: {post.launch_service_provider.name}</div>

              <div className="text-xs leading-tight">
                {post.mission.description && post.mission.description}
              </div>
            </div>
          ) : (
            <div>
              <h2 className="my-0 flex items-center">No information available</h2>
            </div>
          )}
        </div>

        {/* Image - RIGHT Column */}
        <div className="relative rounded-2xl overflow-hidden">
          {post.image && (
            <img src={post.image} loading="lazy" alt={post.name} className="h-full w-full object-cover" />
          )}
        </div>
      </div>
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

    const postStartDay = post.start && dayjs(post.start).format("ll");
    const postStartTime = post.start && dayjs(post.start).format("LT");

    return (
      <div
        className="grid grid-cols-[150px_1fr_150px] p-6 mt-8 relative bg-black/40 rounded-2xl overflow-hidden shadow-[0_10px_15px_-3px_rgba(0,0,0,0.45)] transition-all duration-200 text-white hover:-translate-y-2.5 hover:bg-[#3c2ea9]"
        key={post.id}
      >
        {/* Date/Time Box - LEFT Column */}
        <div className="flex items-center">
          <div className="rounded-2xl justify-center text-center text-black bg-[#edf8eb] py-8 px-6">
            <div className="text-sm uppercase font-medium">
              {dayjs(postStartDay).isToday() ? "Today" : postStartDay}
            </div>
            {postStartTime && <div className="text-xl font-semibold mt-2.5">{postStartTime}</div>}
          </div>
        </div>

        {/* Mission Details - MIDDLE Column */}
        <div className="p-5">
          <div>
            <h2 className="my-0 flex items-center mb-2.5">{post.name}</h2>

            <div className="mb-2.5 [&>*:not(:last-child)]:mr-1.5">
              {missionType && (
                <Chip color="neutral" size="sm">
                  {missionType}
                </Chip>
              )}
            </div>

            <div className="mb-2.5 text-sm">Station: {post.spacestation.name}</div>

            {agency && <div className="text-xs leading-tight">Agency: {agency}</div>}
          </div>
        </div>

        {/* Image - RIGHT Column */}
        <div className="relative rounded-2xl overflow-hidden flex items-center justify-center">
          {imageUrl && (
            <img src={imageUrl} loading="lazy" alt={post.name} className="max-w-full h-auto object-contain" />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="my-6">
      {launches &&
        "results" in launches &&
        launches.results.map((post) => launch(post))}

      {expeditions &&
        "results" in expeditions &&
        expeditions.results.map((post) => expedition(post))}
    </div>
  );
}
