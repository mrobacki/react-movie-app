import { useState } from "react";
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

import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const API_KEY = "c75b54b8";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const { movies, loading, error } = useMovies(query);

  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectedId(id) {
    setSelectedId((prev) => (prev === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);

    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

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
