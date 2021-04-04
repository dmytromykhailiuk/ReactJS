import { movies } from "mocks";
import { getMovie } from "api";
import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import {
  loadMovieInOverviewFaildAction,
  loadMovieInOverviewSuccessAction,
} from "../actions";
import { throwError } from "redux-saga-test-plan/providers";
import { loadMovieInOverviewWorker } from "./load-movie-in-overview";
import { history } from "router";
import { RouterPaths } from "shared/enums";

const historyPush = jest.spyOn(history, "push");

describe("loadMovieInOverviewWorker", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should dispatch 'loadMovieInOverviewSuccessAction(movie)' when response was success", () => {
    return expectSaga(loadMovieInOverviewWorker, { payload: "121" })
      .provide([[matchers.call.fn(getMovie), movies[0]]])
      .put(loadMovieInOverviewSuccessAction(movies[0]))
      .run();
  });

  it("should dispatch 'loadMovieInOverviewFaildAction()' when response was not success and call 'historyPush' with 'RouterPaths.ERROR'", () => {
    return expectSaga(loadMovieInOverviewWorker, { payload: "121" })
      .provide([[matchers.call.fn(getMovie), throwError()]])
      .put(loadMovieInOverviewFaildAction())
      .run()
      .then(() => {
        expect(historyPush).toHaveBeenCalledWith(RouterPaths.ERROR);
      });
  });
});
