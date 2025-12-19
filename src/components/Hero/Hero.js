"use client";

import { Typography } from "@mui/joy";
import Moon from "../Moon/Moon";

export default function Hero() {
  return (
    <div className="pt-[150px] relative sm:pt-[75px]">
      <Typography level="h1" className="text-white">
        Launchpad
      </Typography>
      <p className="text-xl pb-[75px] leading-tight text-white sm:text-sm sm:pb-8">
        Upcoming launches, dockings, and expeditions
      </p>

      <Moon />
    </div>
  );
}
