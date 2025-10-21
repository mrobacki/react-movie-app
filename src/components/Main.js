import { useState } from "react";
import Box from "./main/Box";
import List from "./main/List";
import Summary from "./main/Summary";

export default function Main({ tempWatchedData, average, movies }) {
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <main className="main">
      <Box>
        <List movies={movies} listType="catalog" />
      </Box>

      <Box>
        <>
          <Summary watched={watched} average={average} />
          <List movies={watched} listType="watched" />
        </>
      </Box>
    </main>
  );
}
