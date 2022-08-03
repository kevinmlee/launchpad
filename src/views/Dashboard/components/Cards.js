import React, { useEffect, useState } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import { Button, TextField } from "@mui/joy";
import dayjs from "dayjs";

import "./Cards.css";

export default function Cards({ data }) {
  useEffect(() => {}, []);

  console.log(data);

  return (
    <CssVarsProvider>
      <div className="cards">
        {data.results.map((post) => (
          <div className="card" key={post.id}>
            <div className="featured-image">
              <img src={post.image} alt={post.mission.name} />
            </div>
            <div class="details">
              <div className="mission">
                <h3 className="name">{post.mission.name}</h3>
                <div className="type">{post.mission.type}</div>
                <div className="desc">{post.mission.description}</div>
                <div className="target-date">{post.net}</div>
              </div>
              <div className="lp">{post.launch_service_provider.name}</div>
              <div className="status">{post.status.abbrev}</div>
            </div>
          </div>
        ))}
      </div>
    </CssVarsProvider>
  );
}
