import React, { useEffect, useState } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import { Button, Typography } from "@mui/joy";

export default function UserInput() {
  useEffect(() => {}, []);

  return (
    <CssVarsProvider>
      <Typography level="h1">UserInput</Typography>
    </CssVarsProvider>
  );
}
