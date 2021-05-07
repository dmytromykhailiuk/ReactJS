import { put } from 'redux-saga/effects';
import { getSearchQuery } from 'shared/helpers';
import { RouterPaths } from 'shared/enums';
import { history } from 'router';
import { loadMoviesAction, hideLoaderAction } from '../actions';

export function* searchMoviesWorker({
  payload,
}: {
  payload: {
    searchingValue: string;
    scrollToMovies: () => void;
  };
}) {
  const searchingValue = getSearchQuery();
  if (payload.searchingValue !== searchingValue) {
    history.push(`${RouterPaths.SEARCH}?SearchQuery=${payload.searchingValue}`);
    yield put(loadMoviesAction());
    payload.scrollToMovies();
  } else {
    yield put(hideLoaderAction());
  }
}
