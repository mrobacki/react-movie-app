import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";

import Logo from "./components/ui/Logo";
import Search from "./components/ui/Search";
import Result from "./components/navbar/Result";
import Box from "./components/main/Box";
import List from "./components/main/List";
import Summary from "./components/main/Summary";
import Loader from "./components/ui/Loader";
import ErrorMessage from "./components/ui/ErrorMessage";
import SelectedMovie from "./components/main/SelectedMovie";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const API_KEY = "c75b54b8";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectedId(id) {
    setSelectedId((prev) => (prev === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(() => {
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

    handleCloseMovie();
    fetchData();

    return function () {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <Result>
          Found <strong>{movies.length}</strong> results
        </Result>
      </Navbar>
      <Main>
        <Box>
          {loading && <Loader />}
          {!loading && !error && (
            <List
              movies={movies}
              listType="catalog"
              onSelectedId={handleSelectedId}
            />
          )}
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Box>
        <Box>
          {selectedId ? (
            <SelectedMovie
              selectedId={selectedId}
              apiKey={API_KEY}
              onCloseMovie={handleCloseMovie}
              onAddWatch={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched} average={average} />
              <List
                movies={watched}
                listType="watched"
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
