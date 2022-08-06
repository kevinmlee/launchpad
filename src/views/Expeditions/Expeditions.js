import React, { useEffect, useState } from "react";
import { CssVarsProvider } from "@mui/joy/styles";

import Hero from "../../components/Hero/Hero";
import Cards from "../../components/Cards/Cards";
import SolarSystemLoader from "../../components/SolarSystemLoader/SolarSystemLoader";

// for pagination
// https://ll.thespacedevs.com/2.2.0/launch/?limit=10&offset=10

export default function Expeditions() {
  const [expeditions, setExpeditions] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getExpeditions();
  }, []);

  const getExpeditions = async () => {
    setLoading(true);
    await fetch(
      "https://ll.thespacedevs.com/2.2.0/expedition?ordering=-start&limit=20&mode=detailed"
    )
      .then((response) => response.json())
      .then((data) => {
        setExpeditions(data);
        setLoading(false);
      });
  };

  return (
    <CssVarsProvider>
      <Hero />

      {loading ? <SolarSystemLoader /> : <Cards expeditions={expeditions} />}
    </CssVarsProvider>
  );
}
