import { useState, useEffect } from "react";

const KEY = "c2245539";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      // callback?.();

      const controller = new AbortController();

      async function fetchedMovies() {
        try {
          setIsLoading(true);
          setError("");
          const response = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!response.ok) throw new Error("Something went wrong...");

          const data = await response.json();

          if (data.Response === "False") throw new Error(`${data.Error}`);

          setMovies(data.Search);
          console.log(data.Search);
          setIsLoading(false);
          setError("");
        } catch (error) {
          console.log(error.message);

          if (error.name !== "AbortError") {
            setError(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      // handleCloseMovie();
      fetchedMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isloading, error };
}
