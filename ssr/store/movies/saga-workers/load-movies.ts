import Router from 'next/router';
import { moviesOptionsSelector } from '../selectors';
import { LoadMoviesResponse, getMovies } from '../../../api';
import { call, put, select, delay } from 'redux-saga/effects';
import { loadMoviesSuccessAction, loadMoviesFaildAction } from '../actions';
import { MoviesOptions } from '../../../models/';
import { execution } from '../../../shared/helpers';

export function* loadMoviesWorker({
  payload: { searchingValue = null, hasSearchingValue = false },
}: {
  payload: {
    searchingValue?: string;
    hasSearchingValue?: boolean;
  };
}) {
  try {
    const moviesOptions: MoviesOptions = yield select(moviesOptionsSelector);
    if (!hasSearchingValue && execution.isClient) {
      yield delay(25);
      searchingValue = Router.router.query.SearchQuery as string;
    }
    const { data: movies, totalAmount }: LoadMoviesResponse = yield call(getMovies, {
      ...moviesOptions,
      searchingValue: searchingValue ?? '',
    });
    yield put(loadMoviesSuccessAction({ movies, totalAmount }));
  } catch {
    yield put(loadMoviesFaildAction());
  }
}
