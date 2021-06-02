import { movies } from 'mocks';
import { addMovie, getMovies } from 'api';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { getSearchQuery } from 'shared/helpers';
import { loadMoreMoviesFaildAction, loadMoreMoviesSeccessAction } from '../actions';
import { moviesAmountInStoreSelector, moviesOptionsSelector } from '../selectors';
import { showMoreMoviesWorker } from './show-more-movies';

jest.mock('shared/helpers');

(getSearchQuery as jest.Mock).mockImplementation(() => '');

describe('showMoreMoviesWorker', () => {
  it("should dispatch 'loadMoreMoviesSeccessAction(data)' when response was success", () => {
    const totalAmount = 5;
    return expectSaga(showMoreMoviesWorker)
      .provide([
        [matchers.select(moviesAmountInStoreSelector), 2],
        [matchers.select(moviesOptionsSelector), null],
        [matchers.call.fn(getMovies), { data: movies, totalAmount }],
      ])
      .put(loadMoreMoviesSeccessAction(movies))
      .run();
  });

  it("should dispatch 'loadMoreMoviesFaildAction()' when response was not success", () => {
    (getSearchQuery as jest.Mock).mockImplementation(() => null);
    return expectSaga(showMoreMoviesWorker)
      .provide([
        [matchers.select(moviesAmountInStoreSelector), 2],
        [matchers.select(moviesOptionsSelector), null],
        [matchers.call.fn(addMovie), throwError()],
      ])
      .put(loadMoreMoviesFaildAction())
      .run();
  });
});
