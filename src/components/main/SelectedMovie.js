import { useEffect, useState } from "react";
import StarRating from "../ui/StarRating";
import Loader from "../ui/Loader";

export default function SelectedMovie({
  selectedId,
  apiKey,
  onCloseMovie,
  onAddWatch,
  watched,
}) {
  const [movieData, setMovieData] = useState({});
  const [loading, setLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movieData;

  function handleAdd() {
    const newWatchetMovie = {
      imdbID: selectedId,
      Title: title,
      year,
      Poster: poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    onAddWatch(newWatchetMovie);
    onCloseMovie();
  }

  useEffect(() => {
    async function selectMovieData() {
      try {
        setLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&i=${selectedId}`
        );
        const data = await res.json();
        setMovieData(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    selectMovieData();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;
  }, [title]);

  return (
    <div className="details">
      {loading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size="20"
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button onClick={handleAdd} className="btn-add">
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>You rated this movie: ⭐️ {watchUserRating}</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring: {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
