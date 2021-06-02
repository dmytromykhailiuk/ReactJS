import { Movie } from 'models/movie.model';
import { createAction } from '@reduxjs/toolkit';
import { Categories, SortingOptionsProperties } from 'shared/enums';

const prefix = '[Movies]';

export const loadMoviesAction = createAction(`${prefix} Load Movies`);
export const loadMoviesSuccessAction = createAction<{
  movies: Movie[];
  totalAmount: number;
}>(`${prefix} Load Movies Success`);
export const loadMoviesFaildAction = createAction(`${prefix} Load Movies Faild`);

export const addMovieAction = createAction<Movie>(`${prefix} Add Movie`);
export const addMovieSuccessAction = createAction<Movie>(`${prefix} Add Movie Success`);
export const addMovieFaildAction = createAction(`${prefix} Add Movie Faild`);

export const editMovieAction = createAction<Movie>(`${prefix} Edit Movie`);
export const editMovieSuccessAction = createAction<Movie>(`${prefix} Edit Movie Success`);
export const editMovieFaildAction = createAction(`${prefix} Edit Movie Faild`);

export const deleteMovieAction = createAction<{
  id: number;
  shouldNavigateToHome: boolean;
}>(`${prefix} Delete Movie`);
export const deleteMovieSuccessAction = createAction<number>(`${prefix} Delete Movie Success`);
export const deleteMovieFaildAction = createAction(`${prefix} Delete Movie Faild`);

export const setSelectedCategoryAction = createAction<Categories>(`${prefix} Set Selected Category`);
export const setSelectedCategorySuccessAction = createAction<Categories>(`${prefix} Set Selected Category Success`);
export const searchMoviesAction = createAction<{
  searchingValue: string;
  scrollToMovies: () => void;
}>(`${prefix} Search Movies`);

export const setSortingOptionAction = createAction<SortingOptionsProperties>(`${prefix} Set Sorting Option`);
export const setSortingOptionSuccessAction = createAction<SortingOptionsProperties>(
  `${prefix} Set Sorting Option Success`,
);
export const setIsDownDirectionValueAction = createAction<boolean>(`${prefix} Set Is Down Direction Value`);

export const clearErrorMessageAction = createAction<Movie>(`${prefix} Clear Error Message`);

export const loadMoreMoviesAction = createAction(`${prefix} Load More Movies`);

export const loadMoreMoviesSeccessAction = createAction<Movie[]>(`${prefix} Load More Movies Seccess`);

export const loadMoreMoviesFaildAction = createAction(`${prefix} Load More Movies Faild`);

export const loadMovieInOverviewAction = createAction<string>(`${prefix} Load Movie In Overview`);

export const loadMovieInOverviewSuccessAction = createAction<Movie>(`${prefix} Load Movie In Overview Seccess`);

export const loadMovieInOverviewFaildAction = createAction(`${prefix} Load Movie In Overview Faild`);

export const clearMovieInOverviewAction = createAction(`${prefix} Clear Movie In Overview`);

export const hideLoaderAction = createAction(`${prefix} Hide Loader`);
