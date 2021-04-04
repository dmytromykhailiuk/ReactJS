import { expectSaga } from "redux-saga-test-plan";
import { hideLoaderAction, loadMoviesAction } from "../actions";
import { getSearchQuery } from "shared/helpers";
import { searchMoviesWorker } from "./search-movie";
import { history } from "router";
import { RouterPaths } from "shared/enums";

jest.mock("shared/helpers");

(getSearchQuery as jest.Mock).mockImplementation(() => "");

const scrollToMovies = jest.fn();
const historyPush = jest.spyOn(history, "push");

describe("showMoreMoviesWorker", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should dispatch 'hideLoaderAction()' when searchingValue in store is not equal searchingValue in path", () => {
    return expectSaga(searchMoviesWorker, {
      payload: {
        searchingValue: "2",
        scrollToMovies,
      },
    })
      .put(loadMoviesAction())
      .run()
      .then(() => {
        expect(scrollToMovies).toHaveBeenCalled();
        expect(historyPush).toHaveBeenCalledWith(
          RouterPaths.SEARCH + "?SearchQuery=2"
        );
      });
  });

  it("should dispatch 'hideLoaderAction()' when searchingValue in store is equal searchingValue in path", () => {
    return expectSaga(searchMoviesWorker, {
      payload: {
        searchingValue: "",
        scrollToMovies,
      },
    })
      .put(hideLoaderAction())
      .run();
  });
});
