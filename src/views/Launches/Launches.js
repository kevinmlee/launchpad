import React, { useEffect, useState } from "react";
import { CssVarsProvider } from "@mui/joy/styles";

import Hero from "../../components/Hero/Hero";
import Cards from "../../components/Cards/Cards";
import SolarSystemLoader from "../../components/SolarSystemLoader/SolarSystemLoader";

// for pagination
// https://ll.thespacedevs.com/2.2.0/launch/?limit=10&offset=10

// should cache data on client side, localStorage perhaps
// should fetch new data every hour or two so API rate limit isn't hit

export default function Launches() {
  const [launches, setLaunches] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (navigator.onLine) getLaunches();
    else console.log("No connection available.");
  }, []);

  const getLaunches = async () => {
    setLoading(true);

    await fetch("https://ll.thespacedevs.com/2.2.0/launch/upcoming?limit=20")
      .then((response) => response.json())
      .then((data) => {
        setLaunches(data);
        setLoading(false);
      });
  };

  return (
    <CssVarsProvider>
      <Hero />

      {loading ? <SolarSystemLoader /> : <Cards launches={launches} />}
    </CssVarsProvider>
  );
}
