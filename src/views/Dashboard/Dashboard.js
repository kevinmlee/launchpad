import React, { useEffect, useState } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import { Button, Typography } from "@mui/joy";

import Hero from "./components/Hero";
import Cards from "./components/Cards";

import upcomingLaunches from "./upcomingLaunches.json";
import upcomingExpeditions from "./upcomingExpeditions.json";

// for pagination
// https://ll.thespacedevs.com/2.2.0/launch/?limit=10&offset=10

export default function Dashboard() {
  const [launches, setLaunches] = useState({});
  const [expeditions, setExpeditions] = useState({});

  useEffect(() => {
    //getLaunches();
    //getExpeditions();

    setLaunches(upcomingLaunches);
    setExpeditions(upcomingExpeditions);
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
      <Cards launches={launches} expeditions={expeditions} />
    </CssVarsProvider>
  );
}
