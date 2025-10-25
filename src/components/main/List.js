import ListItem from "./ListItem";

export default function List({
  movies,
  listType,
  onSelectedId,
  onDeleteWatched,
}) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <ListItem
          onSelectedId={onSelectedId}
          movie={movie}
          listType={listType}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}
