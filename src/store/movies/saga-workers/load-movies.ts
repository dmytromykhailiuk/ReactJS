import { getSearchQuery } from 'shared/helpers';
import { LoadMoviesResponse, getMovies } from 'api';
import { call, put, select } from 'redux-saga/effects';
import { MoviesOptions } from 'models/';
import { loadMoviesSuccessAction, loadMoviesFaildAction } from '../actions';
import { moviesOptionsSelector } from '../selectors';

export function* loadMoviesWorker() {
  try {
    const moviesOptions: MoviesOptions = yield select(moviesOptionsSelector);
    const searchingValue = getSearchQuery();
    const { data: movies, totalAmount }: LoadMoviesResponse = yield call(getMovies, {
      ...moviesOptions,
      searchingValue: searchingValue ?? '',
    });
    yield put(loadMoviesSuccessAction({ movies, totalAmount }));
  } catch {
    yield put(loadMoviesFaildAction());
  }
}
