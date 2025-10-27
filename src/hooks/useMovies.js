import { useState, useEffect } from "react";

const API_KEY = "c75b54b8";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    // callback?.();

    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Something went wrong!");

        const data = await res.json();

        if (data.Response === "False")
          throw new Error(data.Error ? data.Error : "Movie not found");

        setMovies(data.Search || []);
        setError("");
      } catch (err) {
        const message = err?.message || String(err);
        if (err.name !== "AbortError") {
          console.error(message);
          setError(message);
        }
      } finally {
        setLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchData();

    return function () {
      controller.abort();
    };
  }, [query]);

  return { movies, loading, error };
}
