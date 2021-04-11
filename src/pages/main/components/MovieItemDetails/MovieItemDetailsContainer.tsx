import React, { useEffect } from 'react';
import { MovieItemDetailsView } from "./MovieItemDetailsView";
import { MoviesAction, Store, MoviesSelector } from 'store';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Movie } from 'models/';

interface Params {
  id: string; 
}

const MovieItemDetailsContainer = (View: React.FC<MovieItemDetailsView>) => () => {
  const { id: movieId } = useParams<Params>();
  const dispatch = useDispatch();
  const movieInOverview = useSelector<Store, Movie>(MoviesSelector.movieInOverviewSelector);
  const movieInOverviewLoaded = useSelector<Store, boolean>(MoviesSelector.movieInOverviewLoadedSelector);
  
  useEffect(() => {
    dispatch(MoviesAction.loadMovieInOverviewAction(movieId))
  }, [movieId])

  return (
    <View 
      movieInOverview={movieInOverview}
      isLoading={!movieInOverviewLoaded || !movieInOverview}
    />
  )
}

export default MovieItemDetailsContainer;
