import { Movie } from "models/movie.model";
import { createReducer } from "@reduxjs/toolkit";
import { Categories, SortingOptionsProperties } from "shared/enums";
import {
  loadMoviesSuccessAction,
  loadMoviesFaildAction,
  addMovieSuccessAction,
  addMovieFaildAction,
  editMovieSuccessAction,
  editMovieFaildAction,
  deleteMovieSuccessAction,
  deleteMovieFaildAction,
  setSelectedCategoryAction,
  setSearchingValueAction,
  setSortingOptionAction,
  setIsDownDirectionValueAction,
  clearErrorMessageAction,
  showMoreMoviesAction,
} from "./actions";
import { ModalsAction } from "store/modals";

const defaultMoviesAmount = 12;

export interface MoviesState {
  movies: Movie[];
  loaded: boolean;
  selectedMovie: Movie;
  moviesAmountInView: number;
  searchingValue: string;
  selectedCategory: Categories;
  sortingOption: SortingOptionsProperties;
  isDownDirection: boolean;
  errorMessage: string;
}

const moviesInitialState: MoviesState = {
  movies: [],
  loaded: false,
  selectedMovie: null,
  moviesAmountInView: defaultMoviesAmount,
  searchingValue: "",
  selectedCategory: Categories.ALL,
  sortingOption: SortingOptionsProperties.RELEASE_DATE,
  isDownDirection: true,
  errorMessage: null,
};

const moviesReducer = createReducer<MoviesState>(
  moviesInitialState,
  (builder) =>
    builder
      .addCase(loadMoviesSuccessAction, (state, { payload: movies }) => ({
        ...state,
        loaded: true,
        movies,
      }))
      .addCase(loadMoviesFaildAction, (state, { payload: errorMessage }) => ({
        ...state,
        errorMessage,
      }))
      .addCase(addMovieSuccessAction, (state, { payload: movie }) => ({
        ...state,
        movies: [...state.movies, movie],
      }))
      .addCase(addMovieFaildAction, (state, { payload: errorMessage }) => ({
        ...state,
        errorMessage,
      }))
      .addCase(editMovieSuccessAction, (state, { payload: editedMovie }) => ({
        ...state,
        movies: [
          ...state.movies.map((movie) =>
            movie.id === editedMovie.id ? editedMovie : movie
          ),
        ],
        selectedMovie: null,
      }))
      .addCase(editMovieFaildAction, (state, { payload: errorMessage }) => ({
        ...state,
        errorMessage,
        selectedMovie: null,
      }))
      .addCase(deleteMovieSuccessAction, (state, { payload: id }) => {
        const index = state.movies.findIndex((movie) => movie.id === id);
        return {
          ...state,
          movies: [
            ...state.movies.slice(0, index),
            ...state.movies.slice(index + 1),
          ],
          selectedMovie: null,
        };
      })
      .addCase(deleteMovieFaildAction, (state, { payload: errorMessage }) => ({
        ...state,
        errorMessage,
        selectedMovie: null,
      }))
      .addCase(
        setSelectedCategoryAction,
        (state, { payload: selectedCategory }) => ({
          ...state,
          moviesAmountInView: defaultMoviesAmount,
          selectedCategory,
        })
      )
      .addCase(
        setSearchingValueAction,
        (state, { payload: searchingValue }) => ({
          ...state,
          moviesAmountInView: defaultMoviesAmount,
          searchingValue,
        })
      )
      .addCase(setSortingOptionAction, (state, { payload: sortingOption }) => ({
        ...state,
        moviesAmountInView: defaultMoviesAmount,
        sortingOption,
      }))
      .addCase(
        setIsDownDirectionValueAction,
        (state, { payload: isDownDirection }) => ({
          ...state,
          moviesAmountInView: defaultMoviesAmount,
          isDownDirection,
        })
      )
      .addCase(clearErrorMessageAction, (state) => ({
        ...state,
        errorMessage: null,
      }))
      .addCase(
        ModalsAction.setModalInViewAction,
        (state, { payload: { selectedMovie = null } }) => ({
          ...state,
          selectedMovie,
        })
      )
      .addCase(showMoreMoviesAction, (state) => ({
        ...state,
        moviesAmountInView: state.moviesAmountInView + defaultMoviesAmount,
      }))
);

export { moviesReducer };
