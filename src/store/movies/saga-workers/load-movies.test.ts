import { movies } from 'mocks';
import { addMovie, getMovies } from 'api';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { getSearchQuery } from 'shared/helpers';
import { loadMoviesFaildAction, loadMoviesSuccessAction } from '../actions';
import { loadMoviesWorker } from './load-movies';
import { moviesOptionsSelector } from '../selectors';

jest.mock('shared/helpers');

(getSearchQuery as jest.Mock).mockImplementation(() => '');

describe('loadMoviesWorker', () => {
  it("should dispatch 'loadMoviesSuccessAction(data)' when response was success", () => {
    const totalAmount = 5;
    return expectSaga(loadMoviesWorker)
      .provide([
        [matchers.select(moviesOptionsSelector), null],
        [matchers.call.fn(getMovies), { data: movies, totalAmount }],
      ])
      .put(loadMoviesSuccessAction({ movies, totalAmount }))
      .run();
  });

  it("should dispatch 'loadMoviesFaildAction()' when response was not success", () => {
    (getSearchQuery as jest.Mock).mockImplementation(() => null);
    return expectSaga(loadMoviesWorker)
      .provide([
        [matchers.select(moviesOptionsSelector), null],
        [matchers.call.fn(addMovie), throwError()],
      ])
      .put(loadMoviesFaildAction())
      .run();
  });
});
