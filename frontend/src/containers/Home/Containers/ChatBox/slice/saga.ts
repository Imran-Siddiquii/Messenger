import { all, call, put, takeLatest } from 'redux-saga/effects';
import { groupRenameError, groupRenameInitail, groupRenameSuccess } from '.';
import { PayloadAction } from '@reduxjs/toolkit';
import { apiRequest } from '../../../../../utils/apiRequest';
import { selectedChat } from '../../ChatList/slice';

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
      yield put(selectedChat({ user: response,updateGroup:true }));
    } else {
      yield put(groupRenameError(response));
    }
  } catch (error) {
    console.log('🚀 ~ error:', error);

    yield put(groupRenameError());
  }
}

export default function* chatBoxSaga() {
  yield all([takeLatest(groupRenameInitail.type, groupRenameWorker)]);
}
