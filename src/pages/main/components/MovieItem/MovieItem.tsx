import React, { useCallback, useMemo, useState } from "react";
import { Movie } from "models";
import { ThreeDotsIcon } from "shared/components";
import classes from "./MovieItem.module.scss";
import { MovieMenu } from "../";
import { isClickInside } from "shared/helpers";
import { useHistory } from "react-router";

const DEFAULT_IMG_PATH = "https://diesel.lviv.ua/img/no-picture.png";

interface MovieItemProps {
  movie: Movie;
  onEditMovie: (movie: Movie) => void;
  onDeleteMovie: (movie: Movie) => void;
}

const MovieItem: React.FC<MovieItemProps> = React.memo(({ 
  movie, 
  onEditMovie,
  onDeleteMovie,
}) => {
  const [shoudShowMenu, setShoudShowMenuValue] = useState(false);
  const [hasError, setHasErrorValue] = useState(false);

  useMemo(() => {
    setHasErrorValue(false);
  }, [movie.id]);

  const setError = useCallback(() => {
    setHasErrorValue(true);
  }, []);

  const history = useHistory();

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

  const onMovieItemClick = useCallback((event: React.SyntheticEvent) => {
    if(isClickInside(event, classes["movie__three-dots"], classes["movie__menu"])) {
      history.push(`/film/${movie.id}`);
      window.scrollTo(0, 0);
    }
  }, [])

  return (
    <div className={classes.movie} onClick={onMovieItemClick}>
      <div className={classes["movie__image-wrapper"]}>
        <img 
          src={hasError ? DEFAULT_IMG_PATH : movie.poster_path} 
          alt={movie.title}
          className={classes["movie__image"]}
          onError={setError}
        />
        { shoudShowMenu ? 
          <div 
            className={classes["movie__menu"]} 
          >
            <MovieMenu 
              uniqueClass={movie.id}
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
          <div className={classes.movie__category}>{movie.genres.join(", ")}</div>
        </div>
        <div className={classes.movie__release}>{movie.release_date.split('-')[0]}</div>
      </div>
    </div>
  );
});

export default MovieItem;
