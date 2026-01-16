"use client";

import { useEffect, useState, useCallback } from "react";
import dayjs from "dayjs";
import Cards from "../Cards/Cards";

const endpoint = "https://ll.thespacedevs.com/2.2.0";
const currentTime = dayjs().format();

export default function ExpeditionsSection({ launches }) {
  const [expeditions, setExpeditions] = useState({});

  const getExpeditions = useCallback(async () => {
    const cachedExpeditions =
      localStorage.getItem("expeditions_v2") &&
      JSON.parse(localStorage.getItem("expeditions_v2"));

    if (cachedExpeditions) {
      const difference = dayjs(currentTime).diff(dayjs(cachedExpeditions.at));
      const minutesDiff = Math.floor((difference / 1000 / 60) % 60);

      if (minutesDiff < 30) setExpeditions(cachedExpeditions);
      else if (navigator.onLine) fetchExpeditions();
    } else if (navigator.onLine) fetchExpeditions();
  }, []);

  const fetchExpeditions = async () => {
    const now = dayjs().format("YYYY-MM-DD");
    await fetch(
      `${endpoint}/expedition?end__gte=${now}&ordering=start&limit=20&mode=detailed`
    )
      .then((response) => response.json())
      .then((data) => {
        if ("results" in data) {
          const cache = data;
          cache["at"] = currentTime;

          localStorage.setItem("expeditions_v2", JSON.stringify(cache));
          setExpeditions(cache);
        }
      });
  };

  useEffect(() => {
    getExpeditions();
  }, [getExpeditions]);

  return <Cards launches={launches} expeditions={expeditions} />;
}
