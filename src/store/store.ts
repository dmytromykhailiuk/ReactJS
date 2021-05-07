import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { spawn } from '@redux-saga/core/effects';
import { modalsReducer, ModalsState } from './modals';
import { moviesReducer, moviesSaga, MoviesState } from './movies';

function* rootSaga() {
  yield spawn(moviesSaga);
}

const sagaMiddleware = createSagaMiddleware();

export interface Store {
  movies: MoviesState;
  modals: ModalsState;
}

const store = createStore(
  combineReducers({ movies: moviesReducer, modals: modalsReducer }),
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

export { store };
