import React from 'react';
import { MovieItemDetailsView } from "./MovieItemDetailsView";
import { Store, MoviesSelector } from '../../store';
import { useSelector } from 'react-redux';
import { Movie } from '../../models/';

const MovieItemDetailsContainer = (View: React.FC<MovieItemDetailsView>) => () => {
  const movieInOverview = useSelector<Store, Movie>(MoviesSelector.movieInOverviewSelector);
  const movieInOverviewLoaded = useSelector<Store, boolean>(MoviesSelector.movieInOverviewLoadedSelector);
  const shouldCheckImages = useSelector<Store, boolean>(MoviesSelector.shouldCheckImagesSelector);

  return (
    <View 
      movieInOverview={movieInOverview}
      isLoading={!movieInOverviewLoaded || !movieInOverview}
      shouldCheckImages={shouldCheckImages}
    />
  )
}

export default MovieItemDetailsContainer;
