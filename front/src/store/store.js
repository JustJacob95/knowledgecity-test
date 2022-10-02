import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createMiddlewareSaga from 'redux-saga';
import reducers from './redusers'
import rootSaga from './sagas'

// const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f;
const sagaMiddleware = createMiddlewareSaga();
export const store = configureStore(
  {
    reducer: reducers,
    middleware: [...getDefaultMiddleware(), sagaMiddleware],
    // devTools: reduxDevTools
  }
);
sagaMiddleware.run(rootSaga);