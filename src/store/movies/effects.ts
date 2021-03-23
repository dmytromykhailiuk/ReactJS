import { Movie } from "models";
import {
  getMovies,
  addMovie,
  editMovie,
  deleteMovie,
  LoadMoviesResponse,
  getMovie,
} from "api";
import { call, put, select, takeLatest } from "redux-saga/effects";
import * as Action from "./actions";
import { history } from "router";
import {
  moviesAmountInStoreSelector,
  moviesOptionsSelector,
  selectedCategorySelector,
  sortingOptionSelector,
} from "./selectors";
import {
  Categories,
  RouterPaths,
  SortingOptionsProperties,
} from "shared/enums";
import { getSearchQuery, scrollToElement } from "shared/helpers";

interface MoviesOptions {
  sortingOption: SortingOptionsProperties;
  isDownDirection: boolean;
  selectedCategory: Categories;
}

function* loadMoviesWorker() {
  try {
    const moviesOptions: MoviesOptions = yield select(moviesOptionsSelector);
    const searchingValue = getSearchQuery();
    const { data: movies, totalAmount }: LoadMoviesResponse = yield call(
      getMovies,
      {
        ...moviesOptions,
        searchingValue: searchingValue ?? "",
      }
    );
    yield put(Action.loadMoviesSuccessAction({ movies, totalAmount }));
  } catch {
    yield put(Action.loadMoviesFaildAction());
  }
}

function* addMovieWorker({ payload }: { payload: Movie }) {
  try {
    const movie: Movie = yield call(addMovie, payload);
    yield put(Action.addMovieSuccessAction(movie));
  } catch {
    yield put(Action.addMovieFaildAction());
  }
}

function* editMovieWorker({ payload }: { payload: Movie }) {
  try {
    const movie: Movie = yield call(editMovie, payload);
    yield put(Action.editMovieSuccessAction(movie));
  } catch {
    yield put(Action.editMovieFaildAction());
  }
}

function* deleteMovieWorker({
  payload: { id, shouldNavigateToHome },
}: {
  payload: {
    id: number;
    shouldNavigateToHome: boolean;
  };
}) {
  try {
    yield call(deleteMovie, id);
    if (shouldNavigateToHome) {
      history.push(RouterPaths.HOME);
    }
    yield put(Action.deleteMovieSuccessAction(id));
  } catch {
    yield put(Action.deleteMovieFaildAction());
  }
}

function* searchMoviesWorker({
  payload,
}: {
  payload: {
    searchingValue: string;
    movieBoard: HTMLElement;
  };
}) {
  const searchingValue = getSearchQuery();
  if (payload.searchingValue !== searchingValue) {
    history.push(RouterPaths.SEARCH + "?SearchQuery=" + payload.searchingValue);
    yield put(Action.loadMoviesAction());
    setTimeout(() => {
      scrollToElement(payload.movieBoard);
    });
  } else {
    yield put(Action.hideLoaderAction());
  }
}

function* setSelectedCategoryWorker({ payload }: { payload: Categories }) {
  const categoryInStore: Categories = yield select(selectedCategorySelector);
  if (payload !== categoryInStore) {
    yield put(Action.setSelectedCategorySuccessAction(payload));
    yield put(Action.loadMoviesAction());
  } else {
    yield put(Action.hideLoaderAction());
  }
}

function* setSortingOptionWorker({
  payload,
}: {
  payload: SortingOptionsProperties;
}) {
  const sortingOptionInStore: SortingOptionsProperties = yield select(
    sortingOptionSelector
  );
  if (payload !== sortingOptionInStore) {
    yield put(Action.setSortingOptionSuccessAction(payload));
    yield put(Action.loadMoviesAction());
  } else {
    yield put(Action.hideLoaderAction());
  }
}

function* loadMovieInOverviewWorker({ payload }: { payload: string }) {
  try {
    const movieInView: Movie = yield call(getMovie, payload);
    yield put(Action.loadMovieInOverviewSuccessAction(movieInView));
  } catch {
    yield put(Action.loadMovieInOverviewFaildAction());
    history.push(RouterPaths.ERROR);
  }
}

function* showMoreMoviesWorker() {
  try {
    const offset: number = yield select(moviesAmountInStoreSelector);
    const moviesOptions: MoviesOptions = yield select(moviesOptionsSelector);
    const searchingValue = getSearchQuery();
    const { data }: LoadMoviesResponse = yield call(getMovies, {
      ...moviesOptions,
      offset,
      searchingValue: searchingValue ?? "",
    });
    yield put(Action.loadMoreMoviesSeccessAction(data));
  } catch {
    yield put(Action.loadMoreMoviesFaildAction());
  }
}

export function* moviesSaga() {
  yield takeLatest(Action.loadMoviesAction, loadMoviesWorker);
  yield takeLatest(Action.addMovieAction, addMovieWorker);
  yield takeLatest(Action.editMovieAction, editMovieWorker);
  yield takeLatest(Action.deleteMovieAction, deleteMovieWorker);
  yield takeLatest(Action.loadMoreMoviesAction, showMoreMoviesWorker);
  yield takeLatest(Action.searchMoviesAction, searchMoviesWorker);
  yield takeLatest(Action.setSortingOptionAction, setSortingOptionWorker);
  yield takeLatest(Action.setIsDownDirectionValueAction, loadMoviesWorker);
  yield takeLatest(Action.setSelectedCategoryAction, setSelectedCategoryWorker);
  yield takeLatest(Action.loadMovieInOverviewAction, loadMovieInOverviewWorker);
}
