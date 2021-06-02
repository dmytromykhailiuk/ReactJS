import { Movie } from 'models/';
import { getMovie } from 'api';
import { history } from 'router';
import { RouterPaths } from 'shared/enums';
import { call, put } from 'redux-saga/effects';
import { loadMovieInOverviewFaildAction, loadMovieInOverviewSuccessAction } from '../actions';

export function* loadMovieInOverviewWorker({ payload }: { payload: string }) {
  try {
    const movieInView: Movie = yield call(getMovie, payload);
    yield put(loadMovieInOverviewSuccessAction(movieInView));
  } catch {
    yield put(loadMovieInOverviewFaildAction());
    history.push(RouterPaths.ERROR);
  }
}
