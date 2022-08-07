import React from "react";

import "./Moon.css";

export default function Moon() {
  return (
    <div className="moon-container">
      <div className="moon">
        <div className="craters"></div>
        <div className="eye-left"></div>
        <div className="eye-right"></div>
      </div>
      <div className="stars">
        <div className="top"></div>
        <div className="left"></div>
        <div className="right"></div>
        <div className="bottom"></div>
      </div>
    </div>
  );
}
