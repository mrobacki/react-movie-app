export default function ListItem({
  movies,
  movie,
  listType,
  onSelectedId,
  onDeleteWatched,
}) {
  const isCatalog = listType === "catalog";
  const isWatched = listType === "watched";
  return (
    <li onClick={isCatalog ? () => onSelectedId(movie.imdbID) : undefined}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      {isCatalog && (
        <>
          <div>
            <p>
              <span>🗓</span>
              <span>{movie.Year}</span>
            </p>
          </div>
        </>
      )}
      {isWatched && (
        <>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime} min</span>
            </p>
            <button
              className="btn-delete"
              onClick={() => onDeleteWatched(movie.imdbID)}
            >
              X
            </button>
          </div>
        </>
      )}
    </li>
  );
}
