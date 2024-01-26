// rootSaga.js
import { all } from 'redux-saga/effects';
import authSaga from '../containers/Auth/slice/saga';

function* rootSaga() {
  yield all([
    authSaga(),
    // Add other sagas here as needed
  ]);
}

export default rootSaga;
