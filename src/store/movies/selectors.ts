import { createSelector } from "reselect";
import { MoviesState } from "./reducer";

const moviesSelector = (state: { movies: MoviesState }) => state.movies;

export const moviesDataSelector = createSelector(
  moviesSelector,
  (movies) => movies.movies
);

export const loadedSelector = createSelector(
  moviesSelector,
  (movies) => movies.loaded
);

export const selectedMovieSelector = createSelector(
  moviesSelector,
  (movies) => movies.selectedMovie
);

export const moviesAmountSelector = createSelector(
  moviesSelector,
  (movies) => movies.moviesAmount
);

export const selectedCategorySelector = createSelector(
  moviesSelector,
  (movies) => movies.selectedCategory
);

export const sortingOptionSelector = createSelector(
  moviesSelector,
  (movies) => movies.sortingOption
);

export const isDownDirectionSelector = createSelector(
  moviesSelector,
  (movies) => movies.isDownDirection
);

export const moviesAmountInStoreSelector = createSelector(
  moviesSelector,
  (movies) => movies.movies.length
);

export const moviesLoadingSelector = createSelector(
  moviesSelector,
  (movies) => movies.moviesLoading
);

export const moreMoviesLoadedSelector = createSelector(
  moviesSelector,
  (movies) => movies.moreMoviesLoaded
);

export const movieInOverviewSelector = createSelector(
  moviesSelector,
  (movies) => movies.movieInOverview
);

export const movieInOverviewLoadedSelector = createSelector(
  moviesSelector,
  (movies) => movies.movieInOverviewLoaded
);

export const moviesOptionsSelector = createSelector(
  moviesSelector,
  (movies) => ({
    sortingOption: movies.sortingOption,
    isDownDirection: movies.isDownDirection,
    selectedCategory: movies.selectedCategory,
  })
);
