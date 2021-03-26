import { getSearchQuery } from "shared/helpers";
import { moviesOptionsSelector } from "../selectors";
import { LoadMoviesResponse, getMovies } from "api";
import { call, put, select } from "redux-saga/effects";
import { loadMoviesSuccessAction, loadMoviesFaildAction } from "../actions";
import { MoviesOptions } from "models/";

export function* loadMoviesWorker() {
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
    yield put(loadMoviesSuccessAction({ movies, totalAmount }));
  } catch {
    yield put(loadMoviesFaildAction());
  }
}
