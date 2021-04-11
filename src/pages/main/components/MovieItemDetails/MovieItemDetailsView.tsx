import { Movie } from 'models/movie.model';
import React from 'react';
import classes from './MovieItemDetails.module.scss'
import { useDefaultImage } from 'shared/hooks';
import { Loader } from 'shared/components';

const loaderWrapperStyles = { marginTop: "80px", marginBottom: "80px" };

export interface MovieItemDetailsView {
  movieInOverview: Movie;
  isLoading: boolean;
}

const MovieItemDetailsView: React.FC<MovieItemDetailsView> = React.memo(({
  movieInOverview, 
  isLoading
}) => { 
  const [defaultImage, setError] = useDefaultImage(movieInOverview?.poster_path);

  return (
    <>
      { !isLoading ? (
        <div className={classes["movie-details"]}>
          <img 
            className={classes["movie-details__image"]} 
            src={ defaultImage || movieInOverview.poster_path }
            alt={movieInOverview.title}
            onError={setError}
          />
          <div className={classes["movie-details__info"]}>
            <div className={classes["movie-details__first-info-line"]}>
              <h2 className={classes["movie-details__title"]}>{ movieInOverview.title }</h2>
              <div className={classes["movie-details__rating"]}>{ movieInOverview.vote_average.toFixed(1) }</div>
            </div>
            <p className={classes["movie-details__category"]}>{ movieInOverview.genres.join(', ') }</p>
            <div className={classes["movie-details__third-info-line"]}>
              <div className={classes["movie-details__release-date"]}>{ movieInOverview.release_date.split('-')[0] }</div>
              { movieInOverview.runtime && <div>{ movieInOverview.runtime } min</div> }
            </div>
            <div className={classes["movie-details__overview"]}> { movieInOverview.overview } </div>
          </div>
        </div>
      ) : (
        <div style={loaderWrapperStyles}><Loader /></div>
      ) }
    </>
    
  )
})

export default MovieItemDetailsView;
