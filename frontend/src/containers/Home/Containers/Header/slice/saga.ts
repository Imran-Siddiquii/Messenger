import { all, call, put, takeLatest } from 'redux-saga/effects';
import { searchUser, searchUserFailed, searchUserSuccessful } from './index'; // Assuming you have another action to watch for
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { apiRequest } from '../../../../../utils/apiRequest';

async function convertToJson(response: any) {
  return await response.json();
}

function* userSearchWorker(
  action: ActionCreatorWithPayload<{
    value: string;
  }>,
): Generator<any, void, any> {
  try {
    const result = yield call(apiRequest, 'POST', 'user?search=', null, action);
    const response = yield call(convertToJson, result); // Assuming payload contains login credentials
    yield put(searchUserSuccessful({ value: response }));
  } catch (error) {
    console.log(error);
    yield put(searchUserFailed({ value: true }));
  }
}

function* headerSaga() {
  yield all([
    takeLatest(searchUser.type, userSearchWorker),
    //  takeLatest(signIn.type, signInWorker),
  ]);
}

export default headerSaga;
