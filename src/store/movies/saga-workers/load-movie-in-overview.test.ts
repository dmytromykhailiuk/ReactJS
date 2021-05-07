import { movies } from 'mocks';
import { getMovie } from 'api';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { history } from 'router';
import { RouterPaths } from 'shared/enums';
import { loadMovieInOverviewWorker } from './load-movie-in-overview';
import { loadMovieInOverviewFaildAction, loadMovieInOverviewSuccessAction } from '../actions';

const historyPush = jest.spyOn(history, 'push');

describe('loadMovieInOverviewWorker', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should dispatch 'loadMovieInOverviewSuccessAction(movie)' when response was success", () =>
    expectSaga(loadMovieInOverviewWorker, { payload: '121' })
      .provide([[matchers.call.fn(getMovie), movies[0]]])
      .put(loadMovieInOverviewSuccessAction(movies[0]))
      .run());

  it("should dispatch 'loadMovieInOverviewFaildAction()' when response was not success and call 'historyPush' with 'RouterPaths.ERROR'", () =>
    expectSaga(loadMovieInOverviewWorker, { payload: '121' })
      .provide([[matchers.call.fn(getMovie), throwError()]])
      .put(loadMovieInOverviewFaildAction())
      .run()
      .then(() => {
        expect(historyPush).toHaveBeenCalledWith(RouterPaths.ERROR);
      }));
});
