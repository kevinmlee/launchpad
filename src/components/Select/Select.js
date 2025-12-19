import React, { useEffect, useState, useRef } from "react";

import "./Select.css";

export default function Select({ label, options, selectOption }) {
  const [showOptions, setShowOptions] = useState(false);
  const [selected, setSelected] = useState("");
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
      <label onClick={(e) => setShowOptions(!showOptions)}>
        <svg className="w-5 h-5 inline-block mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
        </svg>
        {selected ? selected : label}
      </label>

      <ul className={"options " + (showOptions && "opened")}>
        {options.map((option) => (
          <li
            key={option}
            value={option}
            onClick={(e) => {
              selectOption(option);
              setSelected(option);
              setShowOptions(false);
            }}
          >
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
