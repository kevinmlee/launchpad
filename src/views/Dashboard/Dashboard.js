import React, { useEffect, useState } from "react";
import { CssVarsProvider } from "@mui/joy/styles";

import Hero from "../../components/Hero/Hero";
import Cards from "../../components/Cards/Cards";
import SolarSystemLoader from "../../components/SolarSystemLoader/SolarSystemLoader";

import upcomingLaunches from "./upcomingLaunches.json";
import upcomingExpeditions from "./upcomingExpeditions.json";

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
    setLaunches(upcomingLaunches);
    setExpeditions(upcomingExpeditions);
    setLoading(false);
  }, []);

  const getLaunches = async () => {
    await fetch("https://ll.thespacedevs.com/2.2.0/launch/upcoming?limit=20")
      .then((response) => response.json())
      .then((data) => setLaunches(data));
  };

  const getExpeditions = async () => {
    await fetch(
      "https://ll.thespacedevs.com/2.2.0/expedition?ordering=-start&limit=20"
    )
      .then((response) => response.json())
      .then((data) => setExpeditions(data));
  };

  //console.log(launches);
  //console.log(expeditions);

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
