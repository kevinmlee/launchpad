import React, { useEffect, useState, useCallback } from "react";
import dayjs from "dayjs";

import Hero from "../../components/Hero/Hero";
import Cards from "../../components/Cards/Cards";
import { CardSkeletonList } from "../../components/Cards/CardSkeleton";

const endpoint = "https://ll.thespacedevs.com/2.2.0";
const currentTime = dayjs().format();

export default function Launches() {
  const [launches, setLaunches] = useState({});
  const [loading, setLoading] = useState(true);

  // check localStorage for launch data
  // if none found or timer expired, fetch new data
  const getLaunches = useCallback(async () => {
    const cachedLaunches =
      localStorage.getItem("launches") &&
      JSON.parse(localStorage.getItem("launches"));

    if (cachedLaunches) {
      const difference = dayjs(currentTime).diff(dayjs(cachedLaunches.at));
      const minutesDiff = Math.floor((difference / 1000 / 60) % 60);

      if (minutesDiff < 30) {
        setLaunches(cachedLaunches);
        setLoading(false);
      } else if (navigator.onLine) {
        fetchLaunches();
      }
    } else if (navigator.onLine) {
      fetchLaunches();
    }
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
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    getLaunches();
  }, [getLaunches]);

  return (
    <>
      <Hero />

      {loading ? <CardSkeletonList count={5} /> : <Cards launches={launches} />}
    </>
  );
}
