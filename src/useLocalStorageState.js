import { useState, useEffect } from "react";

export function useLocalStorageState(initialSate, key) {
  const [value, setValue] = useState(function () {
    const storedWatchedMovies = localStorage.getItem(key);
    console.log(storedWatchedMovies);
    return storedWatchedMovies ? JSON.parse(storedWatchedMovies) : initialSate;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
