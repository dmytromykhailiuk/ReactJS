import { Movie } from "../../models";

export function filterMovies(
  movies: Movie[],
  searchingValue: string,
  categories: string
) {
  return movies.filter(
    (movie) =>
      (categories === "ALL"
        ? true
        : movie.category.toLowerCase().includes(categories.toLowerCase())) &&
      movie.title.toLowerCase().includes(searchingValue.toLowerCase())
  );
}
