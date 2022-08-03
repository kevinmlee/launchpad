import React, { useEffect, useState } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import { Button, Typography, TextField } from "@mui/joy";

import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

import "./UserInput.css";

export default function UserInput() {
  useEffect(() => {}, []);

  return (
    <CssVarsProvider>
      <div className="user-input">
        <TextField
          classes={{ root: "searchField" }}
          id="search"
          label="Plain"
          placeholder="Search by name or event"
          variant="plain"
        />

        <Select id="date" defaultValue="">
          <Option value="">Date</Option>
          <Option value="dog">Dog</Option>
          <Option value="cat">Cat</Option>
        </Select>

        <Select id="location" defaultValue="">
          <Option value="">Location</Option>
          <Option value="dog">Dog</Option>
          <Option value="cat">Cat</Option>
        </Select>

        <Select id="event" defaultValue="">
          <Option value="">Event</Option>
          <Option value="launch">Launch</Option>
        </Select>

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
