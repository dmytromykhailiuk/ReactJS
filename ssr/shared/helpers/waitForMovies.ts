import { Store as State } from "../../store";
import { Store } from "redux";

export const waitForMovies = (store: Store<State>): Promise<void> =>
  new Promise((r) => {
    store.subscribe(() => {
      const moviesLoading = store.getState().movies.moviesLoading;
      if (!moviesLoading) {
        r();
      }
    });
  });
