import React, { useEffect, useState, useCallback } from "react";
import dayjs from "dayjs";
import { CssVarsProvider } from "@mui/joy/styles";

import Hero from "../../components/Hero/Hero";
import Cards from "../../components/Cards/Cards";
import SolarSystemLoader from "../../components/SolarSystemLoader/SolarSystemLoader";

const endpoint = "https://ll.thespacedevs.com/2.2.0";
const currentTime = dayjs().format();

export default function Launches() {
  const [launches, setLaunches] = useState({});
  const [loading, setLoading] = useState(true);

  // check localStorage for launch data
  // if none found or timer expired, fetch new data
  const getLaunches = useCallback(async () => {
    const cachedLaunches =
      localStorage.getItem("launches") &&
      JSON.parse(localStorage.getItem("launches"));

    if (cachedLaunches) {
      const difference = dayjs(currentTime).diff(dayjs(cachedLaunches.at));
      const minutesDiff = Math.floor((difference / 1000 / 60) % 60);

      if (minutesDiff < 30) setLaunches(cachedLaunches);
      else if (navigator.onLine) fetchLaunches();
    } else if (navigator.onLine) fetchLaunches();
  }, []);

  const fetchLaunches = async () => {
    await fetch(`${endpoint}/launch/upcoming?limit=20`)
      .then((response) => response.json())
      .then((data) => {
        if ("results" in data) {
          const cache = data;
          cache["at"] = currentTime;

          localStorage.setItem("launches", JSON.stringify(cache));
          setLaunches(cache);
        }
      });
  };

  useEffect(() => {
    getLaunches();
    setLoading(false);
  }, [getLaunches]);

  return (
    <CssVarsProvider>
      <Hero />

      {loading ? <SolarSystemLoader /> : <Cards launches={launches} />}
    </CssVarsProvider>
  );
}
