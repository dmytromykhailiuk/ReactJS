import { expectSaga } from 'redux-saga-test-plan';
import { getSearchQuery } from 'shared/helpers';
import { history } from 'router';
import { RouterPaths } from 'shared/enums';
import { searchMoviesWorker } from './search-movie';
import { hideLoaderAction, loadMoviesAction } from '../actions';

jest.mock('shared/helpers');

(getSearchQuery as jest.Mock).mockImplementation(() => '');

const scrollToMovies = jest.fn();
const historyPush = jest.spyOn(history, 'push');

describe('showMoreMoviesWorker', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should dispatch 'hideLoaderAction()' when searchingValue in store is not equal searchingValue in path", () =>
    expectSaga(searchMoviesWorker, {
      payload: {
        searchingValue: '2',
        scrollToMovies,
      },
    })
      .put(loadMoviesAction())
      .run()
      .then(() => {
        expect(scrollToMovies).toHaveBeenCalled();
        expect(historyPush).toHaveBeenCalledWith(`${RouterPaths.SEARCH}?SearchQuery=2`);
      }));

  it("should dispatch 'hideLoaderAction()' when searchingValue in store is equal searchingValue in path", () =>
    expectSaga(searchMoviesWorker, {
      payload: {
        searchingValue: '',
        scrollToMovies,
      },
    })
      .put(hideLoaderAction())
      .run());
});
