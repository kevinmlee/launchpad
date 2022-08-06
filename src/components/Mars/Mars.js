import React from "react";

import "./Mars.css";

export default function Mars() {
  return (
    <div className="mars-container">
      <div class="orbit">
        <div class="mars">
          <div class="craters"></div>
          <div class="eye-left"></div>
          <div class="eye-right"></div>
          <div class="mouth"></div>
        </div>
        <div class="moon-orbit">
          <div class="moon-1"></div>
          <div class="moon-2"></div>
        </div>
      </div>
      <div class="stars">
        <div class="top"></div>
        <div class="left"></div>
        <div class="right"></div>
        <div class="bottom"></div>
      </div>
    </div>
  );
}
