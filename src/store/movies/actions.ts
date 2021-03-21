import { Movie } from "models/movie.model";
import { createAction } from "@reduxjs/toolkit";
import { Categories, SortingOptionsProperties } from "shared/enums";

const prefix = "[Movies]";

export const loadMoviesAction = createAction(`${prefix} Load Movies`);
export const loadMoviesSuccessAction = createAction<Movie[]>(
  `${prefix} Load Movies Success`
);
export const loadMoviesFaildAction = createAction(
  `${prefix} Load Movies Faild`
);

export const addMovieAction = createAction<Movie>(`${prefix} Add Movie`);
export const addMovieSuccessAction = createAction<Movie>(
  `${prefix} Add Movie Success`
);
export const addMovieFaildAction = createAction(`${prefix} Add Movie Faild`);

export const editMovieAction = createAction<Movie>(`${prefix} Edit Movie`);
export const editMovieSuccessAction = createAction<Movie>(
  `${prefix} Edit Movie Success`
);
export const editMovieFaildAction = createAction(`${prefix} Edit Movie Faild`);

export const deleteMovieAction = createAction<{
  id: number;
  shouldNavigateToHome: boolean;
}>(`${prefix} Delete Movie`);
export const deleteMovieSuccessAction = createAction<number>(
  `${prefix} Delete Movie Success`
);
export const deleteMovieFaildAction = createAction(
  `${prefix} Delete Movie Faild`
);

export const setSelectedCategoryAction = createAction<Categories>(
  `${prefix} Set Selected Category`
);
export const setSearchingValueAction = createAction<string>(
  `${prefix} Set Searching Value`
);
export const setSortingOptionAction = createAction<SortingOptionsProperties>(
  `${prefix} Set Sorting Option`
);
export const setIsDownDirectionValueAction = createAction<boolean>(
  `${prefix} Set Is Down Direction Value`
);

export const clearErrorMessageAction = createAction<Movie>(
  `${prefix} Clear Error Message`
);

export const showMoreMoviesAction = createAction(
  `${prefix} Show More Movies Action`
);
