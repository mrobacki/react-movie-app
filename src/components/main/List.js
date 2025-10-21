import ListItem from "./ListItem";

export default function List({ movies, listType }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <ListItem movie={movie} listType={listType} key={movie.imdbID} />
      ))}
    </ul>
  );
}
