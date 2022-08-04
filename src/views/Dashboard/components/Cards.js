import React, { useEffect, useState } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import { Button, TextField, Chip } from "@mui/joy";
import dayjs from "dayjs";

import "./Cards.css";

export default function Cards({ data }) {
  useEffect(() => {}, []);

  const completion = (type) => {
    let color = "neutral";
    if (type === "Success" || type === "Go") color = "success";
    if (type === "Failure") color = "danger";
    if (type === "TBC" || type === "TBD") color = "warning";

    return (
      <Chip className="type" color={color} size="sm">
        {type}
      </Chip>
    );
  };

  return (
    <CssVarsProvider>
      <div className="container">
        <div className="cards">
          {"results" in data &&
            data.results.map((post) => (
              <div className="card" key={post.id}>
                <div className="chips">
                  {"mission" in post && post.mission && (
                    <Chip className="type" color="neutral" size="sm">
                      {post.mission.type}
                    </Chip>
                  )}

                  {completion(post.status.abbrev)}
                </div>

                <div className={"featured-image " + (!post.image && "no-img")}>
                  {post.image && <img src={post.image} loading="lazy" />}
                </div>

                <div className="details">
                  {"mission" in post && post.mission ? (
                    <div className="mission">
                      <h3 className="name">{post.mission.name}</h3>
                      <div className="lp">
                        LSP: {post.launch_service_provider.name}
                      </div>
                      <div className="desc">
                        {post.mission.description && post.mission.description}
                      </div>
                      <div className="target-date">
                        {dayjs(post.net).format("ddd, MMM D, YYYY h:mm A")}
                      </div>
                    </div>
                  ) : (
                    <div className="mission">
                      <h3 className="name">No information</h3>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </CssVarsProvider>
  );
}
