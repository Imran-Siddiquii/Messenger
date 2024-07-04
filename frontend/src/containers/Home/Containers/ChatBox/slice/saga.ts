import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import {
  groupDeleteError,
  groupDeleteInitail,
  groupRenameError,
  groupRenameInitail,
  groupRenameSuccess,
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

export default function* chatBoxSaga() {
  yield all([
    takeLatest(groupRenameInitail.type, groupRenameWorker),
    takeLatest(groupDeleteInitail.type, groupDeleteWorker),
  ]);
}
