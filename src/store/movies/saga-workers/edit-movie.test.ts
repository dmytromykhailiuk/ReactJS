import { movies } from "mocks";
import { editMovie } from "api";
import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { editMovieFaildAction, editMovieSuccessAction } from "../actions";
import { throwError } from "redux-saga-test-plan/providers";
import { editMovieWorker } from "./edit-movie";
import { ModalsAction } from "store/modals";

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

  it("should dispatch 'ModalsAction.setErrorMessagesAction(messages)' when response was not success and status equal 400", () => {
    const messages = ["1"];
    return expectSaga(editMovieWorker, { payload: movies[0] })
      .provide([
        [
          matchers.call.fn(editMovie),
          throwError({ status: 400, messages } as any),
        ],
      ])
      .put(ModalsAction.setErrorMessagesAction(messages))
      .run();
  });
});
