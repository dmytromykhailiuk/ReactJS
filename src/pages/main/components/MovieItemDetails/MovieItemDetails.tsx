import { Movie } from 'models/movie.model';
import React from 'react';
import classes from './MovieItemDetails.module.scss'

interface MovieItemDetailsProps {
  movie: Movie;
}

const MovieItemDetails: React.FC<MovieItemDetailsProps> = ({ movie }) => {
  return (
    <div className={classes["movie-details"]}>
      <img className={classes["movie-details__image"]} src={ movie.url } />
      <div className={classes["movie-details__info"]}>
        <div className={classes["movie-details__first-info-line"]}>
          <h2 className={classes["movie-details__title"]}>{ movie.title }</h2>
          <div className={classes["movie-details__rating"]}>{ movie.rating.toFixed(1) }</div>
        </div>
        <p className={classes["movie-details__category"]}>{ movie.category.join(', ') }</p>
        <div className={classes["movie-details__third-info-line"]}>
          <div className={classes["movie-details__release-date"]}>{ movie.releaseDate.split('-')[0] }</div>
          <div>{ movie.duration } min</div>
        </div>
        <div className={classes["movie-details__overview"]}> { movie.overview } </div>
      </div>
    </div>
  )
}

export default MovieItemDetails;
