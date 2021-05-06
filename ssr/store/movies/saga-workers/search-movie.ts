import { put, delay } from "redux-saga/effects";
import { RouterPaths } from "../../../shared/enums";
import Router from "next/router";
import { loadMoviesAction } from "../actions";

export function* searchMoviesWorker({
  payload,
}: {
  payload: {
    searchingValue: string;
    scrollToMovies: () => void;
  };
}) {
  yield delay(25);
  const searchingValue = Router.query.SearchQuery as string;
  if (payload.searchingValue !== searchingValue) {
    Router.push(RouterPaths.SEARCH + "?SearchQuery=" + payload.searchingValue);
    if (searchingValue || payload.searchingValue) {
      yield put(
        loadMoviesAction({
          searchingValue: payload.searchingValue,
          hasSearchingValue: true,
        })
      );
    }
    payload.scrollToMovies();
  }
}
