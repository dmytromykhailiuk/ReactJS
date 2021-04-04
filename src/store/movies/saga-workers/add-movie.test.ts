import { movies } from "mocks";
import { addMovie } from "api";
import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { addMovieFaildAction, addMovieSuccessAction } from "../actions";
import { addMovieWorker } from "./add-movie";
import { throwError } from "redux-saga-test-plan/providers";

describe("addMovieWorker", () => {
  it("should dispatch 'addMovieSuccessAction(movie)' when response was success", () => {
    return expectSaga(addMovieWorker, { payload: movies[0] })
      .provide([[matchers.call.fn(addMovie), movies[0]]])
      .put(addMovieSuccessAction(movies[0]))
      .run();
  });

  it("should dispatch 'addMovieFaildAction()' when response was not success", () => {
    return expectSaga(addMovieWorker, { payload: movies[0] })
      .provide([[matchers.call.fn(addMovie), throwError()]])
      .put(addMovieFaildAction())
      .run();
  });
});
