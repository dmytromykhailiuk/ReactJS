import { Store as State } from "../../store";
import { Store } from "redux";

export const waitForMovieInOverview = (
  store: Store<State>,
  id: string
): Promise<void> =>
  new Promise((r) => {
    store.subscribe(() => {
      const movieInOverviewId = store.getState().movies.movieInOverview?.id;
      if (String(movieInOverviewId) === id) {
        r();
      }
    });
  });
