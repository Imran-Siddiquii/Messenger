// rootSaga.js
import { all } from 'redux-saga/effects';
import authSaga from '../containers/Auth/slice/saga';
import headerSaga from '../containers/Home/Containers/Header/slice/saga';
import chatListSaga from '../containers/Home/Containers/ChatList/slice/saga';

function* rootSaga() {
  yield all([
    authSaga(),
    headerSaga(),
    chatListSaga(),
    // Add other sagas here as needed
  ]);
}

export default rootSaga;
