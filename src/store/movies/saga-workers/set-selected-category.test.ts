import { expectSaga } from 'redux-saga-test-plan';
import { Categories } from 'shared/enums';
import * as matchers from 'redux-saga-test-plan/matchers';
import { hideLoaderAction, loadMoviesAction, setSelectedCategorySuccessAction } from '../actions';
import { setSelectedCategoryWorker } from './set-selected-category';
import { selectedCategorySelector } from '../selectors';

describe('setSelectedCategoryWorker', () => {
  it("should dispatch 'setSelectedCategorySuccessAction(category)' and 'loadMoviesAction()' when selectedCategory in store is not equal selectedCategory in action", () =>
    expectSaga(setSelectedCategoryWorker, {
      payload: Categories.COMEDY,
    })
      .provide([[matchers.select(selectedCategorySelector), Categories.DOCUMENTARY]])
      .put(setSelectedCategorySuccessAction(Categories.COMEDY))
      .put(loadMoviesAction())
      .run());

  it("should dispatch 'hideLoaderAction()' when selectedCategory in store is equal selectedCategory in action", () =>
    expectSaga(setSelectedCategoryWorker, {
      payload: Categories.COMEDY,
    })
      .provide([[matchers.select(selectedCategorySelector), Categories.COMEDY]])
      .put(hideLoaderAction())
      .run());
});
