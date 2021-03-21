import { Movie } from 'models/movie.model';
import React, { useCallback, useMemo, useState } from 'react';
import classes from './MovieItemDetails.module.scss'

interface MovieItemDetailsProps {
  movie: Movie;
}

const DEFAULT_IMG_PATH = "https://diesel.lviv.ua/img/no-picture.png";

const MovieItemDetails: React.FC<MovieItemDetailsProps> = ({ movie: { 
  poster_path, title, vote_average, genres, release_date, runtime, overview, id
} }) => {
  const [hasError, setHasErrorValue] = useState(false);

  useMemo(() => {
    setHasErrorValue(false);
  }, [id]);

  const setError = useCallback(() => {
    setHasErrorValue(true);
  }, []);
  
  return (
    <div className={classes["movie-details"]}>
      <img 
        className={classes["movie-details__image"]} 
        src={ hasError ? DEFAULT_IMG_PATH : poster_path }
        alt={title}
        onError={setError}
      />
      <div className={classes["movie-details__info"]}>
        <div className={classes["movie-details__first-info-line"]}>
          <h2 className={classes["movie-details__title"]}>{ title }</h2>
          <div className={classes["movie-details__rating"]}>{ vote_average.toFixed(1) }</div>
        </div>
        <p className={classes["movie-details__category"]}>{ genres.join(', ') }</p>
        <div className={classes["movie-details__third-info-line"]}>
          <div className={classes["movie-details__release-date"]}>{ release_date.split('-')[0] }</div>
          { runtime && <div>{ runtime } min</div> }
        </div>
        <div className={classes["movie-details__overview"]}> { overview } </div>
      </div>
    </div>
  )
}

export default MovieItemDetails;
