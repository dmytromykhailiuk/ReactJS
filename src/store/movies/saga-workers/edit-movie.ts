import { Movie } from "models/";
import { editMovie } from "api";
import { editMovieSuccessAction, editMovieFaildAction } from "../actions";
import { call, put } from "redux-saga/effects";

export function* editMovieWorker({ payload }: { payload: Movie }) {
  try {
    const movie: Movie = yield call(editMovie, payload);
    yield put(editMovieSuccessAction(movie));
  } catch {
    yield put(editMovieFaildAction());
  }
}
