import React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import { Chip } from "@mui/joy";

import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import isToday from "dayjs/plugin/isToday";

import "./Cards.css";

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
      <Chip className="type" color={color} size="sm">
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
      <div className="card launch" key={post.id}>
        <div className="target-date">
          <div className="inner">
            <div className="date">{dayjs(day).isToday() ? "Today" : day}</div>
            <div className="time h3">
              {postNetTime ? postNetTime : postStartTime}
            </div>
          </div>
        </div>

        <div className="details">
          {"mission" in post && post.mission ? (
            <div className="mission">
              <h2 className="name">{post.mission.name}</h2>

              <div className="chips">
                {"mission" in post && post.mission && (
                  <Chip className="type" color="neutral" size="sm">
                    {post.mission.type}
                  </Chip>
                )}

                {status(post.status.abbrev)}
              </div>

              <div className="lp">LSP: {post.launch_service_provider.name}</div>

              <div className="desc">
                {post.mission.description && post.mission.description}
              </div>
            </div>
          ) : (
            <div className="mission">
              <h2 className="name">No information available</h2>
            </div>
          )}
        </div>

        <div className={"featured-image " + (!post.image && "no-img")}>
          {post.image && (
            <img src={post.image} loading="lazy" alt={post.name} />
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
    //const postEndDay = post.end && dayjs(post.end).format("ll");
    //const postEndTime = post.end && dayjs(post.end).format("LT");

    return (
      <div className="card expedition" key={post.id}>
        <div className="target-date">
          <div className="inner">
            <div className="date">
              {dayjs(postStartDay).isToday() ? "Today" : postStartDay}
            </div>
            {postStartTime && <div className="time h3">{postStartTime}</div>}
          </div>
        </div>

        {/*<div className={"featured-image " + classes}>
          <img src={imageUrl} loading="lazy" />
          </div>*/}

        <div className="details">
          <div className="mission">
            <h2 className="name">{post.name}</h2>
            <div className="chips">
              {missionType && (
                <Chip className="type" color="neutral" size="sm">
                  {missionType}
                </Chip>
              )}
            </div>
            <div className="lp">Station: {post.spacestation.name}</div>
            {agency && <div className="lp">Agency: {agency}</div>}
          </div>
        </div>

        <img className="patch" src={imageUrl} loading="lazy" alt={post.name} />
      </div>
    );
  };

  return (
    <CssVarsProvider>
      <div className="container">
        <div className="cards">
          {launches &&
            "results" in launches &&
            launches.results.map((post) => launch(post))}

          {expeditions &&
            "results" in expeditions &&
            expeditions.results.map((post) => expedition(post))}
        </div>
      </div>
    </CssVarsProvider>
  );
}
