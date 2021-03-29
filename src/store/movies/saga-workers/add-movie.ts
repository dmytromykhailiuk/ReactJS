import { Movie } from "models/";
import { addMovie } from "api";
import { addMovieSuccessAction, addMovieFaildAction } from "../actions";
import { call, put } from "redux-saga/effects";

export function* addMovieWorker({ payload }: { payload: Movie }) {
  try {
    const movie: Movie = yield call(addMovie, payload);
    yield put(addMovieSuccessAction(movie));
  } catch {
    yield put(addMovieFaildAction());
  }
}
