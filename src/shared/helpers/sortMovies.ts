import { Movie } from "models";

export function sortMovies(movies: Movie[], isDownDirection: boolean) {
  return movies.sort((movie1, movie2) =>
    isDownDirection
      ? movie1.release - movie2.release
      : movie2.release - movie1.release
  );
}
