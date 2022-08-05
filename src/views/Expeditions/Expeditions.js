import React, { useEffect, useState } from "react";
import { CssVarsProvider } from "@mui/joy/styles";

import Hero from "../../components/Hero/Hero";
import Cards from "../../components/Cards/Cards";

// for pagination
// https://ll.thespacedevs.com/2.2.0/launch/?limit=10&offset=10

export default function Expeditions() {
  const [expeditions, setExpeditions] = useState({});

  useEffect(() => {
    getExpeditions();
  }, []);

  const getExpeditions = async () => {
    await fetch(
      "https://ll.thespacedevs.com/2.2.0/expedition?ordering=-start&limit=20"
    )
      .then((response) => response.json())
      .then((data) => setExpeditions(data));
  };

  return (
    <CssVarsProvider>
      <Hero />
      <Cards expeditions={expeditions} />
    </CssVarsProvider>
  );
}
