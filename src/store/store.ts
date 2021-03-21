import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { modalsReducer, ModalsState } from "./modals";
import { moviesReducer, moviesSaga, MoviesState } from "./movies";
import createSagaMiddleware from "redux-saga";
import { spawn } from "@redux-saga/core/effects";

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
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export { store };
