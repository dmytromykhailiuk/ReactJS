import { deleteMovie } from "api";
import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { deleteMovieFaildAction, deleteMovieSuccessAction } from "../actions";
import { throwError } from "redux-saga-test-plan/providers";
import { deleteMovieWorker } from "./delete-movie";
import { history } from "router";
import { RouterPaths } from "shared/enums";
import { LocationDescriptor } from "history";

const historyPush = jest.spyOn(history, "push");

describe("deleteMovieWorker", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should dispatch 'deleteMovieSuccessAction(id)' when response was success and call 'history.push' if 'shouldNavigateToHome' equal true", () => {
    return expectSaga(deleteMovieWorker, {
      payload: { id: 5, shouldNavigateToHome: true },
    })
      .provide([[matchers.call.fn(deleteMovie), null]])
      .put(deleteMovieSuccessAction(5))
      .run()
      .then(() => {
        expect(historyPush).toHaveBeenCalledWith(RouterPaths.HOME);
      });
  });

  it("should dispatch 'deleteMovieSuccessAction(id)' when response was success and shouldn't call 'history.push' if 'shouldNavigateToHome' equal false", () => {
    return expectSaga(deleteMovieWorker, {
      payload: { id: 5, shouldNavigateToHome: false },
    })
      .provide([[matchers.call.fn(deleteMovie), null]])
      .put(deleteMovieSuccessAction(5))
      .run()
      .then(() => {
        expect(historyPush).toBeCalledTimes(0);
      });
  });

  it("should dispatch 'deleteMovieFaildAction()' when response was not success", () => {
    return expectSaga(deleteMovieWorker, {
      payload: { id: 5, shouldNavigateToHome: true },
    })
      .provide([[matchers.call.fn(deleteMovie), throwError()]])
      .put(deleteMovieFaildAction())
      .run();
  });
});
