import React, { useCallback, useState } from "react";
import { Movie } from "models";
import { ThreeDotsIcon } from "shared/components";
import classes from "./MovieItem.module.scss";
import { MovieMenu } from "../";

interface MovieItemProps {
  movie: Movie;
  onEditMovie: (movie: Movie) => void;
  onDeleteMovie: (movie: Movie) => void;
}

const MovieItem: React.FC<MovieItemProps> = ({ 
  movie, 
  onEditMovie,
  onDeleteMovie,
}) => {
  const [shoudShowMenu, setShoudShowMenuValue] = useState(false);

  const onCloseMenu = useCallback(() => {
    setShoudShowMenuValue(false);
  }, []);

  const onOpenMenu = useCallback(() => {
    setShoudShowMenuValue(true);
  }, []);

  const onEditButtonClicked = useCallback(() => {
    setShoudShowMenuValue(false);
    onEditMovie(movie);
  }, [movie]);

  const onDeleteButtonClicked = useCallback(() => {
    setShoudShowMenuValue(false);
    onDeleteMovie(movie);
  }, [movie]);

  return (
    <div className={classes.movie}>
      <div className={classes["movie__image-wrapper"]}>
        <img src={movie.movieUrl} alt={movie.title} className={classes["movie__image"]}/>
        { shoudShowMenu ? 
          <div 
            className={classes["movie__menu"]} 
          >
            <MovieMenu 
              uniqueClass={movie.movieId}
              onCloseButtonClicked={onCloseMenu}
              onEditButtonClicked={onEditButtonClicked}
              onDeleteButtonClicked={onDeleteButtonClicked}
            />
          </div> 
        : 
          <div 
            className={classes["movie__three-dots"]}
            onClick={onOpenMenu}
          >
            <ThreeDotsIcon />
          </div> 
        }
      </div>
      <div className={classes.movie__footer}>
        <div>
          <div className={classes.movie__name}>{movie.title}</div>
          <div className={classes.movie__category}>{movie.genre.join(", ")}</div>
        </div>
        <div className={classes.movie__release}>{movie.releaseDate.split('-')[0]}</div>
      </div>
    </div>
  );
};

export default MovieItem;
