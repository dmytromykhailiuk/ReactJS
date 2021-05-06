import {
  moviesAmountInStoreSelector,
  moviesOptionsSelector,
} from "../selectors";
import { MoviesOptions } from "../../../models";
import { LoadMoviesResponse, getMovies } from "../../../api";
import {
  loadMoreMoviesSeccessAction,
  loadMoreMoviesFaildAction,
} from "../actions";
import { select, put, call, delay } from "redux-saga/effects";
import Router from "next/router";

export function* showMoreMoviesWorker() {
  try {
    const offset: number = yield select(moviesAmountInStoreSelector);
    const moviesOptions: MoviesOptions = yield select(moviesOptionsSelector);
    yield delay(25);
    const searchingValue = Router.query.SearchQuery as string;
    const { data }: LoadMoviesResponse = yield call(getMovies, {
      ...moviesOptions,
      offset,
      searchingValue: searchingValue ?? "",
    });
    yield put(loadMoreMoviesSeccessAction(data));
  } catch {
    yield put(loadMoreMoviesFaildAction());
  }
}
