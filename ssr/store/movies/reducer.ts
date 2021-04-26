import { Movie } from "../../models/movie.model";
import { createReducer } from "@reduxjs/toolkit";
import { Categories, SortingOptionsProperties } from "../../shared/enums";
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
  setSortingOptionAction,
  setIsDownDirectionValueAction,
  clearErrorMessageAction,
  loadMoreMoviesAction,
  loadMoreMoviesSeccessAction,
  loadMoreMoviesFaildAction,
  searchMoviesAction,
  hideLoaderAction,
  setSelectedCategorySuccessAction,
  setSortingOptionSuccessAction,
  loadMovieInOverviewSuccessAction,
  clearMovieInOverviewAction,
  loadMovieInOverviewAction,
  loadMovieInOverviewFaildAction,
  loadMoviesAction,
} from "./actions";
import { ModalsAction } from "../modals";

export interface MoviesState {
  movies: Movie[];
  loaded: boolean;
  selectedMovie: Movie;
  movieInOverview: Movie;
  movieInOverviewLoaded: boolean;
  moviesAmount: number;
  selectedCategory: Categories;
  sortingOption: SortingOptionsProperties;
  isDownDirection: boolean;
  errorMessage: string;
  moviesLoading: boolean;
  moreMoviesLoaded: boolean;
  shouldCheckImages: boolean;
}

const moviesInitialState: MoviesState = {
  movies: [],
  loaded: false,
  selectedMovie: null,
  movieInOverview: null,
  movieInOverviewLoaded: false,
  moviesAmount: 0,
  selectedCategory: Categories.ALL,
  sortingOption: SortingOptionsProperties.RELEASE_DATE,
  isDownDirection: true,
  errorMessage: null,
  moviesLoading: true,
  moreMoviesLoaded: true,
  shouldCheckImages: true,
};

const moviesReducer = createReducer<MoviesState>(
  moviesInitialState,
  (builder) =>
    builder
      .addCase(loadMoviesAction, (state) => ({
        ...state,
        loaded: false,
        moviesLoading: true,
      }))
      .addCase(
        loadMoviesSuccessAction,
        (state, { payload: { movies, totalAmount } }) => ({
          ...state,
          loaded: true,
          moviesLoading: false,
          movies,
          moviesAmount: totalAmount,
        })
      )
      .addCase(loadMoviesFaildAction, (state, { payload: errorMessage }) => ({
        ...state,
        moviesLoading: false,
        errorMessage,
      }))
      .addCase(addMovieSuccessAction, (state, { payload: movie }) => ({
        ...state,
        movies: [...state.movies, movie],
        moviesAmount: state.moviesAmount + 1,
      }))
      .addCase(addMovieFaildAction, (state, { payload: errorMessage }) => ({
        ...state,
        errorMessage,
      }))
      .addCase(editMovieSuccessAction, (state, { payload: editedMovie }) => ({
        ...state,
        movieInOverview:
          state.movieInOverview?.id === editedMovie.id
            ? editedMovie
            : state.movieInOverview,
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
          moviesAmount: state.moviesAmount - 1,
        };
      })
      .addCase(deleteMovieFaildAction, (state, { payload: errorMessage }) => ({
        ...state,
        errorMessage,
        selectedMovie: null,
      }))
      .addCase(setSelectedCategoryAction, (state) => ({
        ...state,
        moviesLoading: true,
      }))
      .addCase(
        setSelectedCategorySuccessAction,
        (state, { payload: selectedCategory }) => ({
          ...state,
          selectedCategory,
        })
      )
      .addCase(setSortingOptionAction, (state) => ({
        ...state,
        moviesLoading: true,
      }))
      .addCase(
        setSortingOptionSuccessAction,
        (state, { payload: sortingOption }) => ({
          ...state,
          sortingOption,
        })
      )
      .addCase(
        setIsDownDirectionValueAction,
        (state, { payload: isDownDirection }) => ({
          ...state,
          isDownDirection,
          moviesLoading: true,
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
      .addCase(loadMoreMoviesAction, (state) => ({
        ...state,
        moreMoviesLoaded: false,
      }))
      .addCase(loadMoreMoviesSeccessAction, (state, { payload }) => ({
        ...state,
        moreMoviesLoaded: true,
        movies: [...state.movies, ...payload],
      }))
      .addCase(loadMoreMoviesFaildAction, (state) => ({
        ...state,
        moreMoviesLoaded: true,
      }))
      .addCase(searchMoviesAction, (state) => ({
        ...state,
        selectedCategory: Categories.ALL,
      }))
      .addCase(hideLoaderAction, (state) => ({
        ...state,
        moviesLoading: false,
      }))
      .addCase(loadMovieInOverviewAction, (state) => ({
        ...state,
        movieInOverviewLoaded: false,
      }))
      .addCase(
        loadMovieInOverviewSuccessAction,
        (state, { payload: movieInOverview }) => ({
          ...state,
          movieInOverview,
          movieInOverviewLoaded: true,
        })
      )
      .addCase(loadMovieInOverviewFaildAction, (state) => ({
        ...state,
        movieInOverviewLoaded: false,
      }))
      .addCase(clearMovieInOverviewAction, (state) => ({
        ...state,
        movieInOverview: null,
        movieInOverviewLoaded: false,
      }))
);

export { moviesReducer };
