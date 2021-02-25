import React from "react";
import { Movie } from "../../../../models";
import { ThreeDotsIcon } from "../../../../shared/components";
import classes from "./MovieItem.module.scss";

interface MovieItemProps {
  movie: Movie;
}

const MovieItem: React.FC<MovieItemProps> = ({ movie }) => {
  return (
    <div className={classes.movie}>
      <div className={classes["movie__image-wrapper"]}>
        <img src={movie.src} alt={movie.title} className={classes["movie__image"]}/>
        <div className={classes["movie__three-dots"]}>
          <ThreeDotsIcon />
        </div>
      </div>
      <div className={classes.movie__footer}>
        <div>
          <div className={classes.movie__name}>{movie.title}</div>
          <div className={classes.movie__category}>{movie.category}</div>
        </div>
        <div className={classes.movie__release}>{movie.release}</div>
      </div>
    </div>
  );
};

export default MovieItem;
