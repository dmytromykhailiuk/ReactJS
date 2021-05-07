import { MoviesOptions } from 'models/';
import { LoadMoviesResponse, getMovies } from 'api';
import { getSearchQuery } from 'shared/helpers';
import { select, put, call } from 'redux-saga/effects';
import { loadMoreMoviesSeccessAction, loadMoreMoviesFaildAction } from '../actions';
import { moviesAmountInStoreSelector, moviesOptionsSelector } from '../selectors';

export function* showMoreMoviesWorker() {
  try {
    const offset: number = yield select(moviesAmountInStoreSelector);
    const moviesOptions: MoviesOptions = yield select(moviesOptionsSelector);
    const searchingValue = getSearchQuery();
    const { data }: LoadMoviesResponse = yield call(getMovies, {
      ...moviesOptions,
      offset,
      searchingValue: searchingValue ?? '',
    });
    yield put(loadMoreMoviesSeccessAction(data));
  } catch {
    yield put(loadMoreMoviesFaildAction());
  }
}
