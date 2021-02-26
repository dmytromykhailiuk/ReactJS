import React from "react";
import { Movie } from "models";
import { MovieItem } from "../MovieItem";
import classes from "./MovieList.module.scss";

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <ul className={classes["movie-list"]}>
      {
        movies.map(movie => <li key={movie.key}><MovieItem movie={movie}/></li>)
      }
    </ul>
  );
}

export default MovieList;
