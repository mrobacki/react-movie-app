export default function ListItem({ movie, listType }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        {listType === "catalog" && (
          <p>
            <span>🗓</span>
            <span>{movie.Year}</span>
          </p>
        )}
        {listType === "watched" && (
          <>
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
          </>
        )}
      </div>
    </li>
  );
}
