import React, { useEffect, useState } from "react";

import Select from "../../../components/Select/Select";

import "./UserInput.css";

const EVENTS = ["Launches", "Expeditions", "Dockings", "Events"];
const LOCATIONS = [
  "Starbase, TX",
  "Kennedy Space Center, FL",
  "Vandenberg Air Force Base, CA",
];
const DATEPICKER = ["test", "test2", "test3", "test4"];

export default function UserInput() {
  useEffect(() => {}, []);

  return (
    <div className="user-input">
      <input
        id="search"
        placeholder="Search by name or event"
        className="px-4 py-2 border rounded"
      />

      <Select label="Date" options={DATEPICKER} />
      <Select label="Location" options={LOCATIONS} />
      <Select label="Events" options={EVENTS} />

      <button
        id="search-btn"
        onClick={(e) => {}}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  );
}
