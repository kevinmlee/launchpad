import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    getLaunches();
    getExpeditions();

    setLoading(true);
    //setLaunches(upcomingLaunches);
    //setExpeditions(upcomingExpeditions);
    setLoading(false);
  }, []);

  // check localStorage for launch data
  // if none found or timer expired, fetch new data
  const getLaunches = async () => {
    const cachedLaunches =
      localStorage.getItem("launches") &&
      JSON.parse(localStorage.getItem("launches"));

    if (cachedLaunches) {
      const difference = dayjs(currentTime).diff(dayjs(cachedLaunches.at));
      const minutes = Math.floor((difference / 1000 / 60) % 60);

      if (minutes < 30) setLaunches(cachedLaunches);
      else fetchLaunches();
    }
    fetchLaunches();
  };

  const fetchLaunches = async () => {
    await fetch(`${endpoint}/launch/upcoming?limit=20`)
      .then((response) => response.json())
      .then((data) => {
        const cache = data;
        cache["at"] = currentTime;

        localStorage.setItem("launches", JSON.stringify(cache));
        setLaunches(cache);
      });
  };

  // check localStorage for expedition data
  // if none found or timer expired, fetch new data
  const getExpeditions = async () => {
    const cachedExpeditions =
      localStorage.getItem("expeditions") &&
      JSON.parse(localStorage.getItem("expeditions"));

    if (cachedExpeditions) {
      const difference = dayjs(currentTime).diff(dayjs(cachedExpeditions.at));
      const minutes = Math.floor((difference / 1000 / 60) % 60);

      if (minutes < 30) setExpeditions(cachedExpeditions);
      else fetchExpeditions();
    }
    fetchExpeditions();
  };

  const fetchExpeditions = async () => {
    await fetch(`${endpoint}/expedition?ordering=-start&limit=20`)
      .then((response) => response.json())
      .then((data) => {
        const cache = data;
        cache["at"] = currentTime;

        localStorage.setItem("expeditions", JSON.stringify(cache));
        setExpeditions(cache);
      });
  };

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
