import { Movie } from "models/";
import { editMovie } from "api";
import { editMovieSuccessAction, editMovieFaildAction } from "../actions";
import { call, put } from "redux-saga/effects";
import { ModalsAction } from "../../modals";

export function* editMovieWorker({ payload }: { payload: Movie }) {
  try {
    const movie: Movie = yield call(editMovie, payload);
    yield put(editMovieSuccessAction(movie));
  } catch (error) {
    if (error?.status === 400) {
      yield put(ModalsAction.setErrorMessagesAction(error.messages));
    } else {
      yield put(editMovieFaildAction());
    }
  }
}
