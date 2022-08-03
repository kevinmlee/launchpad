import React, { useEffect, useState, useRef } from "react";
import "./Select.css";

export default function Select({ label, options }) {
  const [showOptions, setShowOptions] = useState(false);
  const [selected, setSelected] = useState();
  const ref = useRef();

  useEffect(() => {}, []);

  useOutsideClick(ref, (e) => {
    /* if (
      e.target.classList.contains("menu-btn-open") ||
      e.target.classList.contains("menu-button", "false")
    )
      setSidebar(true);
    else setSidebar(false);
    */
    setShowOptions(false);
  });

  return (
    <div id={label.toLowerCase()} className="custom-select" ref={ref}>
      <label onClick={(e) => setShowOptions(!showOptions)}>{label}</label>

      <ul className={"options " + (showOptions && "opened")}>
        {options.map((option) => (
          <li key={option} value={option}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}

const useOutsideClick = (ref, callback) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) callback(e);
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  });
};
