import { applyMiddleware, combineReducers, createStore, AnyAction, Store as ReduxStore } from 'redux';
import { modalsReducer, ModalsState } from './modals';
import { moviesReducer, moviesSaga, MoviesState } from './movies';
import createSagaMiddleware, { Task } from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { spawn } from '@redux-saga/core/effects';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import { execution } from '../shared/helpers';

export interface Store {
  movies: MoviesState;
  modals: ModalsState;
}

let shouldHydrate = true;

export interface SagaStore extends ReduxStore<Store, AnyAction> {
  sagaTask: Task;
}

function* rootSaga() {
  yield spawn(moviesSaga);
}

function rootReducer(state: Store, action: AnyAction) {
  switch (action.type) {
    case HYDRATE:
      if (shouldHydrate) {
        if (execution.isClient) {
          if (!shouldHydrate) {
            return { ...state };
          }
          shouldHydrate = false;
        }
        return { ...state, ...action.payload };
      }

    default: {
      return combineReducers({ movies: moviesReducer, modals: modalsReducer })(
        execution.isClient && state?.movies.shouldCheckImages
          ? { ...state, movies: { ...state.movies, shouldCheckImages: false } }
          : state,
        action,
      );
    }
  }
}

const makeStore = () => {
  if (execution.isServer) {
    shouldHydrate = true;
  }
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
  sagaMiddleware.run(rootSaga);
  return store;
};

export const wrapper = createWrapper<Store>(makeStore);
