import * as Action from './actions';
import * as Worker from './saga-workers';
import { takeLatest } from 'redux-saga/effects';

export function* moviesSaga() {
  yield takeLatest(Action.loadMoviesAction, Worker.loadMoviesWorker);
  yield takeLatest(Action.addMovieAction, Worker.addMovieWorker);
  yield takeLatest(Action.editMovieAction, Worker.editMovieWorker);
  yield takeLatest(Action.deleteMovieAction, Worker.deleteMovieWorker);
  yield takeLatest(Action.loadMoreMoviesAction, Worker.showMoreMoviesWorker);
  yield takeLatest(Action.searchMoviesAction, Worker.searchMoviesWorker);
  yield takeLatest(Action.setSortingOptionAction, Worker.setSortingOptionWorker);
  yield takeLatest(Action.setIsDownDirectionValueAction as any, Worker.loadMoviesWorker);
  yield takeLatest(Action.setSelectedCategoryAction, Worker.setSelectedCategoryWorker);
  yield takeLatest(Action.loadMovieInOverviewAction, Worker.loadMovieInOverviewWorker);
}
