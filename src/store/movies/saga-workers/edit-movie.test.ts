import { movies } from "mocks";
import { editMovie } from "api";
import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { editMovieFaildAction, editMovieSuccessAction } from "../actions";
import { throwError } from "redux-saga-test-plan/providers";
import { editMovieWorker } from "./edit-movie";

describe("editMovieWorker", () => {
  it("should dispatch 'editMovieSuccessAction(movie)' when response was success", () => {
    return expectSaga(editMovieWorker, { payload: movies[0] })
      .provide([[matchers.call.fn(editMovie), movies[0]]])
      .put(editMovieSuccessAction(movies[0]))
      .run();
  });

  it("should dispatch 'editMovieFaildAction()' when response was not success", () => {
    return expectSaga(editMovieWorker, { payload: movies[0] })
      .provide([[matchers.call.fn(editMovie), throwError()]])
      .put(editMovieFaildAction())
      .run();
  });
});
