"use client";

import { Chip } from "@mui/joy";

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
        className="flex relative bg-white/10 rounded-2xl overflow-hidden shadow-[0_10px_15px_-3px_rgba(0,0,0,0.45)] p-5 mt-8 transition-all duration-200 text-white hover:-translate-y-2.5 hover:bg-[#3c2ea9] sm:flex-wrap sm:flex-col sm:p-0"
        key={post.id}
      >
        <div className="w-[150px] min-h-[125px] text-center rounded-2xl text-black sm:w-full sm:order-3 sm:min-h-0 sm:rounded-t-none">
          <div className="relative top-1/2 -translate-y-1/2 p-[50px_15px] text-center rounded-2xl bg-[#edf8eb] sm:top-auto sm:translate-y-0 sm:p-5 sm:rounded-none">
            <div className="text-sm uppercase">{dayjs(day).isToday() ? "Today" : day}</div>
            <div className="text-xl font-semibold mt-2.5">
              {postNetTime ? postNetTime : postStartTime}
            </div>
          </div>
        </div>

        <div className="w-[calc(100%-300px)] sm:w-full sm:order-2 sm:p-5">
          {"mission" in post && post.mission ? (
            <div className="pl-8 pr-[200px] relative top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:p-0 md:pr-8">
              <h2 className="my-0 flex items-center mb-2.5">{post.mission.name}</h2>

              <div className="mb-2.5 [&>*:not(:last-child)]:mr-1.5">
                {"mission" in post && post.mission && (
                  <Chip color="neutral" size="sm" className="!bg-[#6f737c]">
                    {post.mission.type}
                  </Chip>
                )}

                {status(post.status.abbrev)}
              </div>

              <div className="mb-2.5">LSP: {post.launch_service_provider.name}</div>

              <div className="text-xs leading-tight">
                {post.mission.description && post.mission.description}
              </div>
            </div>
          ) : (
            <div className="pl-8 pr-[200px] relative top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:p-0">
              <h2 className="my-0 flex items-center">No information available</h2>
            </div>
          )}
        </div>

        <div className={"rounded-2xl overflow-hidden max-w-[150px] sm:max-w-none sm:order-1 sm:rounded-b-none " + (!post.image && "hidden")}>
          {post.image && (
            <img src={post.image} loading="lazy" alt={post.name} className="h-full object-cover w-full" />
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
        className="flex relative bg-white/10 rounded-2xl overflow-hidden shadow-[0_10px_15px_-3px_rgba(0,0,0,0.45)] p-5 mt-8 transition-all duration-200 text-white hover:-translate-y-2.5 hover:bg-[#3c2ea9] sm:flex-wrap sm:flex-col sm:p-0"
        key={post.id}
      >
        <div className="w-[150px] min-h-[125px] text-center rounded-2xl text-black sm:w-full sm:order-3 sm:min-h-0 sm:rounded-t-none">
          <div className="relative top-1/2 -translate-y-1/2 p-[50px_15px] text-center rounded-2xl bg-[#eceef9] sm:top-auto sm:translate-y-0 sm:p-5 sm:rounded-none">
            <div className="text-sm uppercase">
              {dayjs(postStartDay).isToday() ? "Today" : postStartDay}
            </div>
            {postStartTime && <div className="text-xl font-semibold mt-2.5">{postStartTime}</div>}
          </div>
        </div>

        <div className="w-[calc(100%-300px)] sm:w-full sm:order-2 sm:p-5">
          <div className="pl-8 pr-[200px] relative top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:p-0 md:pr-8">
            <h2 className="my-0 flex items-center mb-2.5">{post.name}</h2>
            <div className="mb-2.5">
              {missionType && (
                <Chip color="neutral" size="sm" className="!bg-[#6f737c]">
                  {missionType}
                </Chip>
              )}
            </div>
            <div className="mb-2.5">Station: {post.spacestation.name}</div>
            {agency && <div className="mb-2.5">Agency: {agency}</div>}
          </div>
        </div>

        <img className="max-w-[150px] h-auto ml-2.5" src={imageUrl} loading="lazy" alt={post.name} />
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
