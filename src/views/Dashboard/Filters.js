import React from "react";
import Select from "../../components/Select/Select";

const filters = ["All", "Launches", "Expeditions"];

export default function Filters() {
  const selectOption = (option) => {
    console.log("selected option", option);
  };

  return (
    <div className="filters">
      <Select label="Filter" options={filters} selectOption={selectOption} />
    </div>
  );
}
