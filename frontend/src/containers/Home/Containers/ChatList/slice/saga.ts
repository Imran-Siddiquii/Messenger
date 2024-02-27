import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchUserChatList,
  userChatListSuccessful,
  userChatListFailed,
} from './index'; // Assuming you have another action to watch for
import { apiRequest } from '../../../../../utils/apiRequest';

async function convertToJson(response: any) {
  return await response.json();
}

function* userChatListWorker(): Generator<any, void, any> {
  try {
    const result = yield call(apiRequest, 'GET', 'user/chat', null, null);
    const response = yield call(convertToJson, result); // Assuming payload contains login credentials
    yield put(userChatListSuccessful({ value: response }));
  } catch (error) {
    console.log(error);
    yield put(userChatListFailed({ value: true }));
  }
}

function* chatListSaga() {
  yield all([
    takeLatest(fetchUserChatList.type, userChatListWorker),
    //  takeLatest(signIn.type, signInWorker),
  ]);
}

export default chatListSaga;
