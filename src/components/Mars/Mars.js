import React from "react";

import "./Mars.css";

export default function Mars() {
  return (
    <div className="mars-container">
      <div className="orbit">
        <div className="mars">
          <div className="craters"></div>
          <div className="eye-left"></div>
          <div className="eye-right"></div>
          <div className="mouth"></div>
        </div>
        <div className="moon-orbit">
          <div className="moon-1"></div>
          <div className="moon-2"></div>
        </div>
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
