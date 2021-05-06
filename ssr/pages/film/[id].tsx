import React from "react";
import { MovieItemDetails, Banner } from "../../components";
import { MoviesAction, MoviesSelector } from "../../store";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { waitForMovies, waitForMovieInOverview, execution } from "../../shared/helpers";

function Film({ shouldFetch }) {
  const dispatch = useDispatch();
  const {query: { id }} = useRouter();
  const movieInOverview = useSelector(MoviesSelector.movieInOverviewSelector);

  useEffect(() => {
    if(shouldFetch && String(movieInOverview?.id) !== id) {
      dispatch(MoviesAction.loadMovieInOverviewAction(id as string));
    }
  }, [id, shouldFetch, movieInOverview])

  return (
    <Banner>
      <MovieItemDetails />
    </Banner>
  )
}

Film.getInitialProps = async({ store, query }) => {
  if (execution.isServer) {
    store.dispatch(MoviesAction.loadMoviesAction({ searchingValue: query.SearchQuery, hasSearchingValue: true }));
    store.dispatch(MoviesAction.loadMovieInOverviewAction(query.id as string));
    await Promise.all([
      waitForMovies(store),
      waitForMovieInOverview(store, query.id as string),
    ]);
    return { shouldFetch: false };
  }
  return { shouldFetch: true };
};

export default Film;
