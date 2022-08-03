import React, { useEffect, useState } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import { Button, Typography } from "@mui/joy";

import Hero from "./components/Hero";

export default function Dashboard() {
  const [launches, setLaunches] = useState({});

  useEffect(() => {
    //getLaunches();
  }, []);

  const getLaunches = async () => {
    // https://ll.thespacedevs.com/2.2.0/launch/?limit=10&offset=10
    await fetch("https://ll.thespacedevs.com/2.2.0/launch/?limit=10")
      .then((response) => response.json())
      .then((data) => setLaunches(data));
  };

  //console.log(launches);

  return (
    <CssVarsProvider>
      <Hero />
    </CssVarsProvider>
  );
}
