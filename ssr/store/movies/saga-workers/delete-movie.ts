import { deleteMovie } from '../../../api';
import { RouterPaths } from '../../../shared/enums';
import { deleteMovieSuccessAction, deleteMovieFaildAction } from '../actions';
import { call, put } from 'redux-saga/effects';
import Router from 'next/router';

export function* deleteMovieWorker({
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
      Router.push(RouterPaths.HOME);
    }
    yield put(deleteMovieSuccessAction(id));
  } catch {
    yield put(deleteMovieFaildAction());
  }
}
