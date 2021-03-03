import { Movie } from "models";
import { Categories } from "../enums";

export function filterMoviesBySearchingValue(
  movies: Movie[],
  searchingValue: string
) {
  if (!searchingValue) {
    return movies;
  }
  return movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchingValue.toLowerCase())
  );
}

export function filterMoviesByCategory(movies: Movie[], categories: string) {
  if (categories === Categories.ALL) {
    return movies;
  }
  return movies.filter((movie) =>
    movie.genre.join(", ").toLowerCase().includes(categories.toLowerCase())
  );
}
