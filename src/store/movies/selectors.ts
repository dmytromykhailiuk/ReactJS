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

export const moviesAmountInViewSelector = createSelector(
  moviesSelector,
  (movies) => movies.moviesAmountInView
);

export const searchingValueSelector = createSelector(
  moviesSelector,
  (movies) => movies.searchingValue
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
