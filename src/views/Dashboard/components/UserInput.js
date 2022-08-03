import React, { useEffect, useState } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import { Button, Typography, TextField } from "@mui/joy";

import Select from "../../../components/Select/Select";

import "./UserInput.css";

const EVENTS = ["Launch", "Expeditions", "Dockings", "Events"];
const LOCATIONS = [
  "Starbase, TX",
  "Kennedy Space Center, FL",
  "Vandenberg Air Force Base, CA",
];
const DATEPICKER = ["test", "test2", "test3", "test4"];

export default function UserInput() {
  useEffect(() => {}, []);

  return (
    <CssVarsProvider>
      <div className="user-input">
        <TextField
          id="search"
          label="Plain"
          placeholder="Search by name or event"
          variant="plain"
        />

        <Select label="Date" options={DATEPICKER} />
        <Select label="Location" options={LOCATIONS} />
        <Select label="Events" options={EVENTS} />

        <Button
          id="search-btn"
          color="primary"
          onClick={(e) => {}}
          size="md"
          variant="solid"
        >
          Search
        </Button>
      </div>
    </CssVarsProvider>
  );
}
