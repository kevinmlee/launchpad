"use client";

import { useEffect, useState, useCallback } from "react";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import isToday from "dayjs/plugin/isToday";

import Hero from "../src/components/Hero/Hero";
import Cards from "../src/components/Cards/Cards";
import SolarSystemLoader from "../src/components/SolarSystemLoader/SolarSystemLoader";

dayjs.extend(LocalizedFormat);
dayjs.extend(isToday);

const endpoint = "https://ll.thespacedevs.com/2.2.0";
const currentTime = dayjs().format();

export default function Home() {
  const [launches, setLaunches] = useState({});
  const [expeditions, setExpeditions] = useState({});
  const [loading, setLoading] = useState(true);

  const getLaunches = useCallback(async () => {
    const cachedLaunches =
      localStorage.getItem("launches") &&
      JSON.parse(localStorage.getItem("launches"));

    if (cachedLaunches) {
      const difference = dayjs(currentTime).diff(dayjs(cachedLaunches.at));
      const minutesDiff = Math.floor((difference / 1000 / 60) % 60);

      if (minutesDiff < 30) setLaunches(cachedLaunches);
      else if (navigator.onLine) fetchLaunches();
    } else if (navigator.onLine) fetchLaunches();
  }, []);

  const fetchLaunches = async () => {
    await fetch(`${endpoint}/launch/upcoming?limit=20`)
      .then((response) => response.json())
      .then((data) => {
        if ("results" in data) {
          const cache = data;
          cache["at"] = currentTime;

          localStorage.setItem("launches", JSON.stringify(cache));
          setLaunches(cache);
        }
      });
  };

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
    getLaunches();
    getExpeditions();
    setLoading(false);
  }, [getLaunches, getExpeditions]);

  return (
    <>
      <Hero />
      <div style={{ color: 'white', padding: '20px' }}>
        <p>Loading: {loading ? 'true' : 'false'}</p>
        <p>Launches count: {launches?.results?.length || 0}</p>
        <p>Expeditions count: {expeditions?.results?.length || 0}</p>
      </div>
      {loading ? (
        <SolarSystemLoader />
      ) : (
        <Cards launches={launches} expeditions={expeditions} />
      )}
    </>
  );
}
