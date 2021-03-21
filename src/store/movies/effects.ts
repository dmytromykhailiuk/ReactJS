import { Movie } from "models/movie.model";
import { getMovies, addMovie, editMovie, deleteMovie } from "api";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  addMovieAction,
  loadMoviesAction,
  loadMoviesFaildAction,
  loadMoviesSuccessAction,
  addMovieSuccessAction,
  addMovieFaildAction,
  editMovieAction,
  editMovieSuccessAction,
  editMovieFaildAction,
  deleteMovieAction,
  deleteMovieSuccessAction,
  deleteMovieFaildAction,
} from "./actions";
import { history } from "router";

function* loadMoviesWorker() {
  try {
    const movies: Movie[] = yield call(getMovies);
    yield put(loadMoviesSuccessAction(movies));
  } catch {
    yield put(loadMoviesFaildAction());
  }
}

function* addMovieWorker({ payload }: { payload: Movie }) {
  try {
    const movie: Movie = yield call(addMovie, payload);
    yield put(addMovieSuccessAction(movie));
  } catch {
    yield put(addMovieFaildAction());
  }
}

function* editMovieWorker({ payload }: { payload: Movie }) {
  try {
    const movie: Movie = yield call(editMovie, payload);
    yield put(editMovieSuccessAction(movie));
  } catch {
    yield put(editMovieFaildAction());
  }
}

function* deleteMovieWorker({
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
      history.push("/");
    }
    yield put(deleteMovieSuccessAction(id));
  } catch {
    yield put(deleteMovieFaildAction());
  }
}

export function* moviesSaga() {
  yield takeLatest(loadMoviesAction, loadMoviesWorker);
  yield takeLatest(addMovieAction, addMovieWorker);
  yield takeLatest(editMovieAction, editMovieWorker);
  yield takeLatest(deleteMovieAction, deleteMovieWorker);
}
