import React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import { Typography } from "@mui/joy";

import "./Hero.css";

//import UserInput from "../UserInput/UserInput";
import Orbit from "../Orbit/Orbit";
import Mars from "../Mars/Mars";
import Moon from "../Moon/Moon";

export default function Hero() {
  return (
    <CssVarsProvider>
      <div className="hero">
        <div className="container">
          <Typography level="h1">Launchpad</Typography>
          <p className="hero-copy">
            Upcoming launches, dockings, and expeditions
          </p>

          <Moon />
        </div>
      </div>
    </CssVarsProvider>
  );
}
