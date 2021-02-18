import { useState, useEffect } from "react";

const getLocalTimeString = () => new Date().toLocaleTimeString("it-IT");

export function useLocalTime(delay = 1000) {
  const [localTime, changeLocalTime] = useState(getLocalTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      changeLocalTime(getLocalTimeString());
    }, delay);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return localTime;
}
