import { expectSaga } from 'redux-saga-test-plan';
import { SortingOptionsProperties } from 'shared/enums';
import * as matchers from 'redux-saga-test-plan/matchers';
import { hideLoaderAction, loadMoviesAction, setSortingOptionSuccessAction } from '../actions';
import { sortingOptionSelector } from '../selectors';
import { setSortingOptionWorker } from './set-sorting-option';

describe('setSortingOptionWorker', () => {
  it("should dispatch 'setSortingOptionSuccessAction(category)' and 'loadMoviesAction()' when sortingOption in store is not equal sortingOption in action", () =>
    expectSaga(setSortingOptionWorker, {
      payload: SortingOptionsProperties.RATING,
    })
      .provide([[matchers.select(sortingOptionSelector), SortingOptionsProperties.DURATION]])
      .put(setSortingOptionSuccessAction(SortingOptionsProperties.RATING))
      .put(loadMoviesAction())
      .run());

  it("should dispatch 'hideLoaderAction()' when sortingOption in store is equal sortingOption in action", () =>
    expectSaga(setSortingOptionWorker, {
      payload: SortingOptionsProperties.RATING,
    })
      .provide([[matchers.select(sortingOptionSelector), SortingOptionsProperties.RATING]])
      .put(hideLoaderAction())
      .run());
});
