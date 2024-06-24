// store.js
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger'; // Import the logger middleware
import rootSaga from '../rootSaga';
import rootReducer from '../rootReducer';
import storage from 'redux-persist/lib/storage'; // Import the web storage
import { persistStore, persistReducer } from 'redux-persist';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['loading'], // Note the correct case for 'blacklist'
  debug: true,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      sagaMiddleware,
      createLogger(),
    ), // Disable serializableCheck for redux-persist
});

sagaMiddleware.run(rootSaga);
const persistor = persistStore(store);

export { store, persistor };
