"use client";

import dynamic from "next/dynamic";

const LaunchMap = dynamic(() => import("./Map"), { ssr: false });

export default function MapWrapper({ launches }) {
  return <LaunchMap launches={launches} />;
}
