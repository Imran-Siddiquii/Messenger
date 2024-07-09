import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import {
  fetchMessages,
  fetchMessagesError,
  fetchMessagesSuccess,
  groupDeleteError,
  groupDeleteInitail,
  groupRenameError,
  groupRenameInitail,
  groupRenameSuccess,
  sendMessage,
  sendMessageError,
  sendMessageSuccess,
} from '.';
import { PayloadAction } from '@reduxjs/toolkit';
import { apiRequest } from '../../../../../utils/apiRequest';
import { removeChat, selectedChat } from '../../ChatList/slice';
import { selectSelectedChat } from '../../ChatList/slice/selector';

async function convertToJson(response: any) {
  return await response.json();
}
function* groupRenameWorker(
  action: PayloadAction<{
    groupDetails: { groupId: string; chatName: string };
  }>,
): Generator<any, void, any> {
  try {
    const result = yield call(
      apiRequest,
      'POST',
      'user/chat/group/rename',
      action.payload.groupDetails,
      null,
    ); // Assuming payload contains login credentials
    const response = yield call(convertToJson, result);
    if (result.status === 200) {
      yield put(groupRenameSuccess(response));
      yield put(selectedChat({ user: response, updateGroup: true }));
    } else {
      yield put(groupRenameError(response));
    }
  } catch (error) {
    console.log('🚀 ~ error:', error);

    yield put(groupRenameError());
  }
}

function* groupDeleteWorker(): Generator<any, void, any> {
  const selectedGroup = yield select(selectSelectedChat);
  try {
    const result = yield call(
      apiRequest,
      'Delete',
      'user/chat/group/delete',
      { groupId: selectedGroup._id },
      null,
    ); // Assuming payload contains login credentials
    const response = yield call(convertToJson, result);
    if (result.status === 200) {
      yield put(removeChat({ id: selectedGroup._id }));
    } else {
      yield put(groupDeleteError(response));
    }
  } catch (error) {
    yield put(groupDeleteError());
  }
}

function* fetchMessageWorker(): Generator<any, void, any> {
  const selectedGroup = yield select(selectSelectedChat);
  try {
    const result = yield call(
      apiRequest,
      'GET',
      'message/' + `${selectedGroup._id}`,
      null,
      null,
    ); // Assuming payload contains login credentials
    const response = yield call(convertToJson, result);
    if (result.status === 200) {
      yield put(fetchMessagesSuccess({ data: response }));
    } else {
      yield put(fetchMessagesError(response));
    }
  } catch (error) {
    yield put(fetchMessagesError());
  }
}

function* sendMessageWorker(
  action: PayloadAction<{ text: string }>,
): Generator<any, void, any> {
  const selectedGroup = yield select(selectSelectedChat);
  try {
    const result = yield call(
      apiRequest,
      'POST',
      'message',
      { chatId: selectedGroup._id, content: action.payload.text },
      null,
    ); // Assuming payload contains login credentials
    const response = yield call(convertToJson, result);

    if (result.status === 201) {
      yield put(sendMessageSuccess({ data: response }));
    } else {
      yield put(sendMessageError(response));
    }
  } catch (error) {
    yield put(sendMessageError());
  }
}
export default function* chatBoxSaga() {
  yield all([
    takeLatest(groupRenameInitail.type, groupRenameWorker),
    takeLatest(groupDeleteInitail.type, groupDeleteWorker),
    takeLatest(fetchMessages.type, fetchMessageWorker),
    takeLatest(sendMessage.type, sendMessageWorker),
  ]);
}
