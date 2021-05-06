import React, { useCallback, useState, useEffect } from "react";
import { Movie } from "../../models";
import { ThreeDotsIcon } from "../../shared/components";
import classes from "./MovieItem.module.scss";
import { MovieMenu } from "../";
import { isClickInside, checkIsValidImagePath, execution } from "../../shared/helpers";
import { useDefaultImage } from "../../shared/hooks";
import Router from "next/router";
import { useSelector } from "react-redux";
import { MoviesSelector } from "../../store";

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
  const [defaultImage, setError] = useDefaultImage(movie.poster_path);
  const shouldCheckImages = useSelector(MoviesSelector.shouldCheckImagesSelector);

  const onCloseMenu = useCallback(() => {
    setShoudShowMenuValue(false);
  }, []);

  useEffect(() => {
    if (execution.isClient && shouldCheckImages) {
      checkIsValidImagePath(movie.poster_path, setError);
    }
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
      Router.push(`/film/${movie.id}`);
      window.scrollTo(0, 0);
    }
  }, [])

  return (
    <div className={classes.movie} onClick={onMovieItemClick}>
      <div className={classes["movie__image-wrapper"]}>
        <img 
          src={defaultImage || movie.poster_path} 
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
