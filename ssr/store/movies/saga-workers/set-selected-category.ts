import { Categories } from '../../../shared/enums';
import { selectedCategorySelector } from '../selectors';
import { setSelectedCategorySuccessAction, loadMoviesAction, hideLoaderAction } from '../actions';
import { select, put } from 'redux-saga/effects';

export function* setSelectedCategoryWorker({ payload }: { payload: Categories }) {
  const categoryInStore: Categories = yield select(selectedCategorySelector);
  if (payload !== categoryInStore) {
    yield put(setSelectedCategorySuccessAction(payload));
    yield put(loadMoviesAction({}));
  } else {
    yield put(hideLoaderAction());
  }
}
