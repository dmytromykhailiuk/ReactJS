import { Movie } from '../../../models';
import { getMovie } from '../../../api';
import { RouterPaths } from '../../../shared/enums';
import { loadMovieInOverviewFaildAction, loadMovieInOverviewSuccessAction } from '../actions';
import { call, put } from 'redux-saga/effects';
import Router from 'next/router';

export function* loadMovieInOverviewWorker({ payload }: { payload: string }) {
  try {
    const movieInView: Movie = yield call(getMovie, payload);
    yield put(loadMovieInOverviewSuccessAction(movieInView));
  } catch {
    yield put(loadMovieInOverviewFaildAction());
    Router.push(RouterPaths.ERROR);
  }
}
