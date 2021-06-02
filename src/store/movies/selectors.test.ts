import { Store } from '..';
import { Categories, SortingOptionsProperties } from '../../shared/enums';
import {
  moviesDataSelector,
  loadedSelector,
  selectedMovieSelector,
  moviesAmountSelector,
  selectedCategorySelector,
  sortingOptionSelector,
  isDownDirectionSelector,
  moviesAmountInStoreSelector,
  moviesLoadingSelector,
  moreMoviesLoadedSelector,
  movieInOverviewSelector,
  movieInOverviewLoadedSelector,
  moviesOptionsSelector,
} from './selectors';

describe('Movie State Selectors', () => {
  let moviesStateMock: Store;

  beforeEach(() => {
    moviesStateMock = {
      movies: {
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
      },
    } as any;
  });

  describe('moviesDataSelector', () => {
    it("should return 'movies' data", () => {
      expect(moviesDataSelector(moviesStateMock)).toEqual(moviesStateMock.movies.movies);
    });
  });

  describe('loadedSelector', () => {
    it("should return 'loaded' value", () => {
      expect(loadedSelector(moviesStateMock)).toEqual(moviesStateMock.movies.loaded);
    });
  });

  describe('selectedMovieSelector', () => {
    it("should return 'selectedMovie' data", () => {
      expect(selectedMovieSelector(moviesStateMock)).toEqual(moviesStateMock.movies.selectedMovie);
    });
  });

  describe('moviesAmountSelector', () => {
    it("should return 'moviesAmount' value", () => {
      expect(moviesAmountSelector(moviesStateMock)).toEqual(moviesStateMock.movies.moviesAmount);
    });
  });

  describe('selectedCategorySelector', () => {
    it("should return 'selectedCategory' value", () => {
      expect(selectedCategorySelector(moviesStateMock)).toEqual(moviesStateMock.movies.selectedCategory);
    });
  });

  describe('sortingOptionSelector', () => {
    it("should return 'sortingOption' value", () => {
      expect(sortingOptionSelector(moviesStateMock)).toEqual(moviesStateMock.movies.sortingOption);
    });
  });

  describe('isDownDirectionSelector', () => {
    it("should return 'isDownDirection' value", () => {
      expect(isDownDirectionSelector(moviesStateMock)).toEqual(moviesStateMock.movies.isDownDirection);
    });
  });

  describe('moviesAmountInStoreSelector', () => {
    it("should return 'movies length' value", () => {
      expect(moviesAmountInStoreSelector(moviesStateMock)).toEqual(moviesStateMock.movies.movies.length);
    });
  });

  describe('moviesLoadingSelector', () => {
    it("should return 'moviesLoading' value", () => {
      expect(moviesLoadingSelector(moviesStateMock)).toEqual(moviesStateMock.movies.moviesLoading);
    });
  });

  describe('moreMoviesLoadedSelector', () => {
    it("should return 'moreMoviesLoaded' value", () => {
      expect(moreMoviesLoadedSelector(moviesStateMock)).toEqual(moviesStateMock.movies.moreMoviesLoaded);
    });
  });

  describe('movieInOverviewSelector', () => {
    it("should return 'movieInOverview' data", () => {
      expect(movieInOverviewSelector(moviesStateMock)).toEqual(moviesStateMock.movies.movieInOverview);
    });
  });

  describe('movieInOverviewLoadedSelector', () => {
    it("should return 'movieInOverviewLoaded' data", () => {
      expect(movieInOverviewLoadedSelector(moviesStateMock)).toEqual(moviesStateMock.movies.movieInOverviewLoaded);
    });
  });

  describe('moviesOptionsSelector', () => {
    it("should return 'movieInOverviewLoaded' data", () => {
      expect(moviesOptionsSelector(moviesStateMock)).toEqual({
        sortingOption: moviesStateMock.movies.sortingOption,
        isDownDirection: moviesStateMock.movies.isDownDirection,
        selectedCategory: moviesStateMock.movies.selectedCategory,
      });
    });
  });
});
