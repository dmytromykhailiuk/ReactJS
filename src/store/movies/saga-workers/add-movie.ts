import { Movie } from 'models/';
import { addMovie } from 'api';
import { call, put } from 'redux-saga/effects';
import { addMovieSuccessAction, addMovieFaildAction } from '../actions';
import { ModalsAction } from '../../modals';

export function* addMovieWorker({ payload }: { payload: Movie }) {
  try {
    const movie: Movie = yield call(addMovie, payload);
    yield put(addMovieSuccessAction(movie));
  } catch (error) {
    if (error?.status === 400) {
      yield put(ModalsAction.setErrorMessagesAction(error.messages));
    } else {
      yield put(addMovieFaildAction());
    }
  }
}
