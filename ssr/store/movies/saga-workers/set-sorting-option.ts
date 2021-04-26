import {
  hideLoaderAction,
  loadMoviesAction,
  setSortingOptionSuccessAction,
} from "../actions";
import { SortingOptionsProperties } from "../../../shared/enums";
import { sortingOptionSelector } from "../selectors";
import { select, put } from "redux-saga/effects";

export function* setSortingOptionWorker({
  payload,
}: {
  payload: SortingOptionsProperties;
}) {
  const sortingOptionInStore: SortingOptionsProperties = yield select(
    sortingOptionSelector
  );
  if (payload !== sortingOptionInStore) {
    yield put(setSortingOptionSuccessAction(payload));
    yield put(loadMoviesAction({}));
  } else {
    yield put(hideLoaderAction());
  }
}
