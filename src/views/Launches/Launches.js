import React, { useEffect, useState } from "react";
import { CssVarsProvider } from "@mui/joy/styles";

import Hero from "../../components/Hero/Hero";
import Cards from "../../components/Cards/Cards";

// for pagination
// https://ll.thespacedevs.com/2.2.0/launch/?limit=10&offset=10

export default function Launches() {
  const [launches, setLaunches] = useState({});
  const [expeditions, setExpeditions] = useState({});

  useEffect(() => {
    getLaunches();
  }, []);

  const getLaunches = async () => {
    await fetch("https://ll.thespacedevs.com/2.2.0/launch/upcoming?limit=20")
      .then((response) => response.json())
      .then((data) => setLaunches(data));
  };

  return (
    <CssVarsProvider>
      <Hero />
      <Cards launches={launches} />
    </CssVarsProvider>
  );
}
