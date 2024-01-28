// store.js
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger'; // Import the logger middleware
import rootSaga from '../rootSaga';
import rootReducer from '../rootReducer';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, logger),
});

sagaMiddleware.run(rootSaga);

export default store;
