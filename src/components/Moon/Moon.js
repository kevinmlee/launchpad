import React from "react";

import "./Moon.css";

export default function Moon() {
  return (
    <div className="moon-container">
      <div class="moon">
        <div class="craters"></div>
        <div class="eye-left"></div>
        <div class="eye-right"></div>
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
