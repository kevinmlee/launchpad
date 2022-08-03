import React, { useEffect, useState } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import { Button, Typography } from "@mui/joy";

import Hero from "./components/Hero";
import Cards from "./components/Cards";
import sampleData from "./sampleData.json";

export default function Dashboard() {
  const [launches, setLaunches] = useState({});

  useEffect(() => {
    //getLaunches();
    setLaunches(sampleData);
  }, []);

  const getLaunches = async () => {
    // https://ll.thespacedevs.com/2.2.0/launch/?limit=10&offset=10
    await fetch("https://ll.thespacedevs.com/2.2.0/launch/?limit=10")
      .then((response) => response.json())
      .then((data) => setLaunches(data));
  };

  return (
    <CssVarsProvider>
      <Hero />
      <Cards data={launches} />
    </CssVarsProvider>
  );
}
