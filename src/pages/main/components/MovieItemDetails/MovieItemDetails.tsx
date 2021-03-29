import { Movie } from 'models/movie.model';
import React from 'react';
import classes from './MovieItemDetails.module.scss'
import { useDefaultImage } from 'shared/hooks';

interface MovieItemDetailsProps {
  movie: Movie;
}

const MovieItemDetails: React.FC<MovieItemDetailsProps> = ({ movie: { 
  poster_path, title, vote_average, genres, release_date, runtime, overview
} }) => {
  const [defaultImage, setError] = useDefaultImage(poster_path);

  return (
    <div className={classes["movie-details"]}>
      <img 
        className={classes["movie-details__image"]} 
        src={ defaultImage || poster_path }
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
