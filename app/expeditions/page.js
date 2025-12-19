"use client";

import { useEffect, useState, useCallback } from "react";
import dayjs from "dayjs";

import Hero from "../../src/components/Hero/Hero";
import Cards from "../../src/components/Cards/Cards";
import SolarSystemLoader from "../../src/components/SolarSystemLoader/SolarSystemLoader";

const endpoint = "https://ll.thespacedevs.com/2.2.0";
const currentTime = dayjs().format();

export default function Expeditions() {
  const [expeditions, setExpeditions] = useState({});
  const [loading, setLoading] = useState(true);

  const getExpeditions = useCallback(async () => {
    const cachedExpeditions =
      localStorage.getItem("expeditions") &&
      JSON.parse(localStorage.getItem("expeditions"));

    if (cachedExpeditions) {
      const difference = dayjs(currentTime).diff(dayjs(cachedExpeditions.at));
      const minutesDiff = Math.floor((difference / 1000 / 60) % 60);

      if (minutesDiff < 30) setExpeditions(cachedExpeditions);
      else if (navigator.onLine) fetchExpeditions();
    } else if (navigator.onLine) fetchExpeditions();
  }, []);

  const fetchExpeditions = async () => {
    await fetch(`${endpoint}/expedition?ordering=-start&limit=20&mode=detailed`)
      .then((response) => response.json())
      .then((data) => {
        if ("results" in data) {
          const cache = data;
          cache["at"] = currentTime;

          localStorage.setItem("expeditions", JSON.stringify(cache));
          setExpeditions(cache);
        }
      });
  };

  useEffect(() => {
    getExpeditions();
    setLoading(false);
  }, [getExpeditions]);

  return (
    <>
      <Hero />

      {loading ? <SolarSystemLoader /> : <Cards expeditions={expeditions} />}
    </>
  );
}
