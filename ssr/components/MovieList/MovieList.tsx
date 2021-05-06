import React from "react";
import { Movie } from "../../models";
import { MovieItem } from "../MovieItem";
import classes from "./MovieList.module.scss";

interface MovieListProps {
  movies: Movie[];
  onEditMovie: (movie: Movie) => void;
  onDeleteMovie: (movie: Movie) => void;
}

const MovieList: React.FC<MovieListProps> = ({ movies, onEditMovie, onDeleteMovie, }) => {
  return (
    <ul className={classes["movie-list"]}>
      {
        movies.map((movie) => (
          <li key={movie.id}>
            <MovieItem
              movie={movie}
              onEditMovie={onEditMovie}
              onDeleteMovie={onDeleteMovie}
            />
          </li>
        ))
      }
    </ul>
  );
};

export default MovieList;
