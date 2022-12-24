import React, { useEffect, useState, useCallback } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import dayjs from "dayjs";

import Hero from "../../components/Hero/Hero";
import Cards from "../../components/Cards/Cards";
import SolarSystemLoader from "../../components/SolarSystemLoader/SolarSystemLoader";

//import upcomingLaunches from "./upcomingLaunches.json";
//import upcomingExpeditions from "./upcomingExpeditions.json";

const endpoint = "https://ll.thespacedevs.com/2.2.0";
const currentTime = dayjs().format();

// for pagination
// https://ll.thespacedevs.com/2.2.0/launch/?limit=10&offset=10

export default function Dashboard() {
  const [launches, setLaunches] = useState({});
  const [expeditions, setExpeditions] = useState({});
  const [loading, setLoading] = useState(false);

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
      else fetchLaunches();
    }
    fetchLaunches();
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

  // check localStorage for expedition data
  // if none found or timer expired, fetch new data
  const getExpeditions = useCallback(async () => {
    const cachedExpeditions =
      localStorage.getItem("expeditions") &&
      JSON.parse(localStorage.getItem("expeditions"));

    if (cachedExpeditions) {
      const difference = dayjs(currentTime).diff(dayjs(cachedExpeditions.at));
      const minutesDiff = Math.floor((difference / 1000 / 60) % 60);

      if (minutesDiff < 30) setExpeditions(cachedExpeditions);
      else fetchExpeditions();
    }
    fetchExpeditions();
  }, []);

  const fetchExpeditions = async () => {
    await fetch(`${endpoint}/expedition?ordering=-start&limit=20`)
      .then((response) => response.json())
      .then((data) => {
        if ("results" in data) {
          const cache = data;
          cache["at"] = currentTime;

          localStorage.setItem("expeditions", JSON.stringify(cache));
          setExpeditions(cache);
        }
      });
  };

  useEffect(() => {
    setLoading(true);
    getLaunches();
    getExpeditions();
    setLoading(false);
  }, [getLaunches, getExpeditions]);

  return (
    <CssVarsProvider>
      <Hero />

      {loading ? (
        <SolarSystemLoader />
      ) : (
        <Cards launches={launches} expeditions={expeditions} />
      )}
    </CssVarsProvider>
  );
}
