import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchUserChatList,
  userChatListSuccessful,
  userChatListFailed,
  accessChat,
  accessChatSuccessful,
} from './index'; // Assuming you have another action to watch for
import { apiRequest } from '../../../../../utils/apiRequest';
import { searchUserEmpty } from '../../Header/slice';

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
function* accessChatWorker(action: any): Generator<any, void, any> {
  try {
    const result = yield call(
      apiRequest,
      'POST',
      'user/chat',
      action.payload,
      null,
    );
    const response = yield call(convertToJson, result); // Assuming payload contains login credentials
    yield put(accessChatSuccessful({ value: response }));
    yield put(searchUserEmpty(''));
  } catch (error) {
    console.log(error);
    yield put(userChatListFailed({ value: true }));
  }
}

function* chatListSaga() {
  yield all([
    takeLatest(fetchUserChatList.type, userChatListWorker),
    takeLatest(accessChat.type, accessChatWorker),
  ]);
}

export default chatListSaga;
