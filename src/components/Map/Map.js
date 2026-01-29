"use client";

import { useRef, useEffect } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./Map.css";

export default function LaunchMap({ launches }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          "carto-dark": {
            type: "raster",
            tiles: [
              "https://basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png",
            ],
            tileSize: 256,
            attribution:
              '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          },
        },
        layers: [
          {
            id: "carto-dark-layer",
            type: "raster",
            source: "carto-dark",
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      },
      center: [0, 20],
      zoom: 1.5,
      attributionControl: false,
    });

    map.current.addControl(
      new maplibregl.AttributionControl({ compact: true }),
      "bottom-right"
    );

    const results = launches?.results || [];
    results.forEach((launch) => {
      const lat = parseFloat(launch.pad?.latitude);
      const lng = parseFloat(launch.pad?.longitude);
      if (isNaN(lat) || isNaN(lng)) return;

      const el = document.createElement("div");
      el.className = "launch-marker";

      const launchName = (launch.name || "").replace(/"/g, "&quot;");
      const padName = (launch.pad?.name || "Unknown Pad").replace(/"/g, "&quot;");
      const locationName = (launch.pad?.location?.name || "").replace(/"/g, "&quot;");

      const popupHTML = `
        <div class="map-popup">
          <div class="map-popup-title">${padName}</div>
          <div class="map-popup-location">${locationName}</div>
          <div class="map-popup-launch">${launchName}</div>
        </div>
      `;

      const popup = new maplibregl.Popup({
        offset: 15,
        closeButton: false,
        className: "space-popup",
      }).setHTML(popupHTML);

      new maplibregl.Marker({ element: el })
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(map.current);
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [launches]);

  return (
    <div className="my-8">
      <h2 className="font-merriweather text-xl md:text-2xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
        Launch Sites
      </h2>
      <div
        ref={mapContainer}
        className="h-[350px] md:h-[450px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]"
      />
    </div>
  );
}
