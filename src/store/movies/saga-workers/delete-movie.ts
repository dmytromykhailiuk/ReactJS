import { deleteMovie } from "api";
import { history } from "router";
import { RouterPaths } from "shared/enums";
import { deleteMovieSuccessAction, deleteMovieFaildAction } from "../actions";
import { call, put } from "redux-saga/effects";

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
      history.push(RouterPaths.HOME);
    }
    yield put(deleteMovieSuccessAction(id));
  } catch {
    yield put(deleteMovieFaildAction());
  }
}
