"use client";

import Moon from "../Moon/Moon";

export default function Hero() {
  return (
    <div className="pt-10 relative sm:pt-20">
      <h1 className="text-white font-merriweather text-5xl font-bold mb-4">
        Launchpad
      </h1>
      <p className="text-xl pb-[75px] text-white">
        Upcoming launches, dockings, and expeditions
      </p>

      <Moon />
    </div>
  );
}
