import React from "react";

import "./SolarSystemLoader.css";

export default function SolarSystemLoader() {
  return (
    <div class="spinner-box">
      <div class="solar-system">
        <div class="earth-orbit orbit">
          <div class="planet earth"></div>
          <div class="venus-orbit orbit">
            <div class="planet venus"></div>
            <div class="mercury-orbit orbit">
              <div class="planet mercury"></div>
              <div class="sun"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
