import React, { useEffect, useState } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import { Button, TextField, Chip } from "@mui/joy";
import dayjs from "dayjs";

import "./Cards.css";

export default function Cards({ launches, expeditions }) {
  useEffect(() => {}, []);

  const status = (type) => {
    let color = "neutral";

    if (type === "Success" || type === "Go" || type === "Active")
      color = "success";
    if (type === "Failure") color = "danger";
    if (type === "TBC" || type === "TBD") color = "warning";

    return (
      <Chip className="type" color={color} size="sm">
        {type}
      </Chip>
    );
  };

  const launch = (post) => {
    return (
      <div className="card launch" key={post.id}>
        <div className="chips">
          {"mission" in post && post.mission && (
            <Chip className="type" color="neutral" size="sm">
              {post.mission.type}
            </Chip>
          )}

          {status(post.status.abbrev)}
        </div>

        <div className={"featured-image " + (!post.image && "no-img")}>
          {post.image && <img src={post.image} loading="lazy" />}
        </div>

        <div className="details">
          {"mission" in post && post.mission ? (
            <div className="mission">
              <h3 className="name">{post.mission.name}</h3>
              <div className="lp">LSP: {post.launch_service_provider.name}</div>
              <div className="desc">
                {post.mission.description && post.mission.description}
              </div>
              <div className="target-date">
                {post.net && dayjs(post.net).format("ddd, MMM D, YYYY h:mm A")}

                {post.start &&
                  dayjs(post.net).format("ddd, MMM D, YYYY h:mm A")}
              </div>
            </div>
          ) : (
            <div className="mission">
              <h3 className="name">No information</h3>
            </div>
          )}
        </div>
      </div>
    );
  };

  const expedition = (post) => {
    let imageUrl = "";
    let classes = "";
    let agency = "";
    let missionType = "";

    if (post.mission_patches.length > 0) {
      imageUrl = post.mission_patches[0].image_url;
      classes = "patch";
      agency = post.mission_patches[0].agency.name;
      missionType = post.mission_patches[0].agency.type;
    } else if (post.spacestation.image_url) {
      imageUrl = post.spacestation.image_url;
      classes = "spacestation";
    } else classes = "no-img";

    return (
      <div className="card expedition" key={post.id}>
        <div className="chips">
          {missionType && (
            <Chip className="type" color="neutral" size="sm">
              {missionType}
            </Chip>
          )}
        </div>

        <div className={"featured-image " + classes}>
          <img src={imageUrl} loading="lazy" />
        </div>

        <div className="details">
          <div className="mission">
            <h3 className="name">{post.name}</h3>
            <div className="lp">{post.spacestation.name}</div>
            {agency && <div className="lp">{agency}</div>}
            <div className="target-date">
              {post.start &&
                dayjs(post.start).format("ddd, MMM D, YYYY h:mm A")}
              {post.end && " -  "}
              {post.end && dayjs(post.end).format("ddd, MMM D, YYYY h:mm A")}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <CssVarsProvider>
      <div className="container">
        <div className="cards">
          {"results" in launches &&
            launches.results.map((post) => launch(post))}

          {"results" in expeditions &&
            expeditions.results.map((post) => expedition(post))}
        </div>
      </div>
    </CssVarsProvider>
  );
}
