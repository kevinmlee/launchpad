"use client";

import { Typography } from "@mui/joy";
import Moon from "../Moon/Moon";

export default function Hero() {
  return (
    <div className="pt-10 relative sm:pt-20">
      <Typography level="h1" className="text-white">
        Launchpad
      </Typography>
      <p className="text-xl pb-[75px] text-white">
        Upcoming launches, dockings, and expeditions
      </p>

      <Moon />
    </div>
  );
}
