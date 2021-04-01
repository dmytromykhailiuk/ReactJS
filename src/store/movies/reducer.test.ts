import { MoviesState, moviesReducer } from "./reducer";
import { Categories, SortingOptionsProperties } from "../../shared/enums";
import {
  loadMoviesSuccessAction,
  loadMoviesFaildAction,
  addMovieFaildAction,
  addMovieSuccessAction,
  editMovieSuccessAction,
  editMovieFaildAction,
  deleteMovieSuccessAction,
  deleteMovieFaildAction,
  setSelectedCategoryAction,
  setSelectedCategorySuccessAction,
  setSortingOptionAction,
  setSortingOptionSuccessAction,
  setIsDownDirectionValueAction,
  clearErrorMessageAction,
  loadMoreMoviesAction,
  loadMoreMoviesSeccessAction,
  loadMoreMoviesFaildAction,
  searchMoviesAction,
  hideLoaderAction,
  loadMovieInOverviewAction,
  loadMovieInOverviewSuccessAction,
  loadMovieInOverviewFaildAction,
  clearMovieInOverviewAction,
} from "./actions";
import { ModalsAction } from "../modals";

const moviesState: MoviesState = {
  movies: [],
  loaded: false,
  selectedMovie: null,
  movieInOverview: null,
  movieInOverviewLoaded: true,
  moviesAmount: 0,
  selectedCategory: Categories.ALL,
  sortingOption: SortingOptionsProperties.RELEASE_DATE,
  isDownDirection: true,
  errorMessage: null,
  moviesLoading: true,
  moreMoviesLoaded: true,
};

const UNEXPECTED_TYPE = "UNEXPECTED";

describe("moviesReducer", () => {
  describe("default case", () => {
    it("should return same state", () => {
      expect(moviesReducer(moviesState, { type: UNEXPECTED_TYPE })).toEqual(
        moviesState
      );
    });
  });

  describe("loadMoviesSuccessAction", () => {
    it("should return state with new data", () => {
      const movies = [{}] as any;
      const totalAmount = 10;
      expect(
        moviesReducer(
          moviesState,
          loadMoviesSuccessAction({ movies, totalAmount })
        )
      ).toEqual({
        ...moviesState,
        loaded: true,
        moviesLoading: false,
        movies,
        moviesAmount: totalAmount,
      });
    });
  });

  describe("loadMoviesFaildAction", () => {
    it("should return state with new data", () => {
      const errorMessage = undefined as any;
      expect(moviesReducer(moviesState, loadMoviesFaildAction())).toEqual({
        ...moviesState,
        errorMessage,
      });
    });
  });

  describe("addMovieSuccessAction", () => {
    it("should return state with new data", () => {
      const movie = {} as any;
      expect(moviesReducer(moviesState, addMovieSuccessAction(movie))).toEqual({
        ...moviesState,
        movies: [...moviesState.movies, movie],
        moviesAmount: moviesState.moviesAmount + 1,
      });
    });
  });

  describe("addMovieFaildAction", () => {
    it("should return state with new data", () => {
      const errorMessage = undefined as any;
      expect(moviesReducer(moviesState, addMovieFaildAction())).toEqual({
        ...moviesState,
        errorMessage,
      });
    });
  });

  describe("editMovieSuccessAction", () => {
    it("should return state with new data", () => {
      const movie = {} as any;
      expect(moviesReducer(moviesState, editMovieSuccessAction(movie))).toEqual(
        {
          ...moviesState,
          movieInOverview:
            moviesState.movieInOverview?.id === movie?.id
              ? movie
              : moviesState.movieInOverview,
          movies: [
            ...moviesState.movies.map((currentMovie) =>
              movie.id === movie?.id ? movie : currentMovie
            ),
          ],
          selectedMovie: null,
        }
      );
    });

    it("should return state with new data when were passed existing id", () => {
      const id = 121;
      const movie = { id } as any;
      const state = {
        ...moviesState,
        movies: [{ id }],
        movieInOverview: { id },
      } as any;
      expect(moviesReducer(state, editMovieSuccessAction(movie))).toEqual({
        ...state,
        movieInOverview:
          state.movieInOverview?.id === movie?.id
            ? movie
            : state.movieInOverview,
        movies: [
          ...state.movies.map((currentMovie: any) =>
            movie.id === movie?.id ? movie : currentMovie
          ),
        ],
        selectedMovie: null,
      });
    });

    it("should return state with new data when were passed no existing id", () => {
      const movie = { id: 121 } as any;
      const state = {
        ...moviesState,
        movies: [{ id: 122 }],
        movieInOverview: { id: 122 },
      } as any;
      expect(moviesReducer(state, editMovieSuccessAction(movie))).toEqual({
        ...state,
        movieInOverview:
          state.movieInOverview?.id === movie?.id
            ? movie
            : state.movieInOverview,
        movies: [
          ...state.movies.map((currentMovie: any) =>
            movie.id !== movie?.id ? movie : currentMovie
          ),
        ],
        selectedMovie: null,
      });
    });
  });

  describe("editMovieFaildAction", () => {
    it("should return state with new data", () => {
      const errorMessage = undefined as any;
      expect(moviesReducer(moviesState, editMovieFaildAction())).toEqual({
        ...moviesState,
        errorMessage,
      });
    });
  });

  describe("deleteMovieSuccessAction", () => {
    const id = 121;

    it("should return state with new data when weren't passed existing id", () => {
      const index = moviesState.movies.findIndex((movie) => movie.id === id);
      expect(moviesReducer(moviesState, deleteMovieSuccessAction(id))).toEqual({
        ...moviesState,
        movies: [
          ...moviesState.movies.slice(0, index),
          ...moviesState.movies.slice(index + 1),
        ],
        selectedMovie: null,
        moviesAmount: moviesState.moviesAmount - 1,
      });
    });

    it("should return state with new data when were passed existing id", () => {
      const state = { ...moviesState, movies: [{ id }] } as any;
      const index = state.movies.findIndex((movie: any) => movie.id === id);
      expect(moviesReducer(state, deleteMovieSuccessAction(id))).toEqual({
        ...state,
        movies: [
          ...state.movies.slice(0, index),
          ...state.movies.slice(index + 1),
        ],
        selectedMovie: null,
        moviesAmount: state.moviesAmount - 1,
      });
    });
  });

  describe("deleteMovieFaildAction", () => {
    it("should return state with new data", () => {
      const errorMessage = undefined as any;
      expect(moviesReducer(moviesState, deleteMovieFaildAction())).toEqual({
        ...moviesState,
        errorMessage,
        selectedMovie: null,
      });
    });
  });

  describe("setSelectedCategoryAction", () => {
    it("should return state with new data", () => {
      expect(
        moviesReducer(moviesState, setSelectedCategoryAction(null))
      ).toEqual({
        ...moviesState,
        moviesLoading: true,
      });
    });
  });

  describe("setSelectedCategorySuccessAction", () => {
    it("should return state with new data", () => {
      const selectedCategory = {} as any;
      expect(
        moviesReducer(
          moviesState,
          setSelectedCategorySuccessAction(selectedCategory)
        )
      ).toEqual({
        ...moviesState,
        selectedCategory,
      });
    });
  });

  describe("setSortingOptionAction", () => {
    it("should return state with new data", () => {
      expect(moviesReducer(moviesState, setSortingOptionAction(null))).toEqual({
        ...moviesState,
        moviesLoading: true,
      });
    });
  });

  describe("setSortingOptionSuccessAction", () => {
    it("should return state with new data", () => {
      const sortingOption = {} as any;
      expect(
        moviesReducer(moviesState, setSortingOptionSuccessAction(sortingOption))
      ).toEqual({
        ...moviesState,
        sortingOption,
      });
    });
  });

  describe("setIsDownDirectionValueAction", () => {
    it("should return state with new data", () => {
      const isDownDirection = false;
      expect(
        moviesReducer(
          moviesState,
          setIsDownDirectionValueAction(isDownDirection)
        )
      ).toEqual({
        ...moviesState,
        isDownDirection,
        moviesLoading: true,
      });
    });
  });

  describe("clearErrorMessageAction", () => {
    it("should return state with new data", () => {
      expect(moviesReducer(moviesState, clearErrorMessageAction(null))).toEqual(
        {
          ...moviesState,
          errorMessage: null,
        }
      );
    });
  });

  describe("ModalsAction.setModalInViewAction", () => {
    it("should return state with new data  when selectedMovie were passed", () => {
      const selectedMovie = {} as any;
      expect(
        moviesReducer(
          moviesState,
          ModalsAction.setModalInViewAction({
            selectedMovie,
            modalType: null,
          } as any)
        )
      ).toEqual({
        ...moviesState,
        selectedMovie,
      });
    });

    it("should return state with new data when selectedMovie weren't passed", () => {
      expect(
        moviesReducer(
          moviesState,
          ModalsAction.setModalInViewAction({
            modalType: null,
          } as any)
        )
      ).toEqual({
        ...moviesState,
        selectedMovie: null,
      });
    });
  });

  describe("loadMoreMoviesAction", () => {
    it("should return state with new data", () => {
      expect(moviesReducer(moviesState, loadMoreMoviesAction())).toEqual({
        ...moviesState,
        moreMoviesLoaded: false,
      });
    });
  });

  describe("loadMoreMoviesSeccessAction", () => {
    it("should return state with new data", () => {
      const arr = [] as any[];
      expect(
        moviesReducer(moviesState, loadMoreMoviesSeccessAction(arr))
      ).toEqual({
        ...moviesState,
        moreMoviesLoaded: true,
        movies: [...moviesState.movies, ...arr],
      });
    });
  });

  describe("loadMoreMoviesFaildAction", () => {
    it("should return state with new data", () => {
      expect(moviesReducer(moviesState, loadMoreMoviesFaildAction())).toEqual({
        ...moviesState,
        moreMoviesLoaded: true,
      });
    });
  });

  describe("searchMoviesAction", () => {
    it("should return state with new data", () => {
      expect(moviesReducer(moviesState, searchMoviesAction(null))).toEqual({
        ...moviesState,
        moviesLoading: true,
      });
    });
  });

  describe("hideLoaderAction", () => {
    it("should return state with new data", () => {
      expect(moviesReducer(moviesState, hideLoaderAction())).toEqual({
        ...moviesState,
        moviesLoading: false,
      });
    });
  });

  describe("loadMovieInOverviewAction", () => {
    it("should return state with new data", () => {
      expect(
        moviesReducer(moviesState, loadMovieInOverviewAction("string"))
      ).toEqual({
        ...moviesState,
        movieInOverviewLoaded: false,
      });
    });
  });

  describe("loadMovieInOverviewSuccessAction", () => {
    it("should return state with new data", () => {
      const movieInOverview = {} as any;
      expect(
        moviesReducer(
          moviesState,
          loadMovieInOverviewSuccessAction(movieInOverview)
        )
      ).toEqual({
        ...moviesState,
        movieInOverview,
        movieInOverviewLoaded: true,
      });
    });
  });

  describe("loadMovieInOverviewFaildAction", () => {
    it("should return state with new data", () => {
      expect(
        moviesReducer(moviesState, loadMovieInOverviewFaildAction())
      ).toEqual({
        ...moviesState,
        movieInOverviewLoaded: true,
      });
    });
  });

  describe("clearMovieInOverviewAction", () => {
    it("should return state with new data", () => {
      expect(moviesReducer(moviesState, clearMovieInOverviewAction())).toEqual({
        ...moviesState,
        movieInOverview: null,
      });
    });
  });
});
