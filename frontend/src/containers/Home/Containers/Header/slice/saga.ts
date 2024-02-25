import { all, takeLatest } from 'redux-saga/effects';
import { searchUser } from './index'; // Assuming you have another action to watch for
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

function* userSearchWorker(
  action: ActionCreatorWithPayload<{
    value: string;
  }>,
): Generator<any, void, any> {
  console.log('🚀 ~ function*userSearchWorker ~ action:', action);

  const result = yield;
  console.log('🚀 ~ function*userSearchWorker ~ result:', result);

  // try {
  //   // const result = yield call(apiRequest, action.payload, 'signup');
  //   const response = yield call(convertToJson, result); // Assuming payload contains login credentials
  //   if (result.status === 200) {
  //     yield put(signInSuccess(response));
  //   } else {
  //     yield put(signInFailuer(response));
  //   }
  // } catch (error) {
  //   yield put(signInFailuer(error));
  // }
}

function* headerSaga() {
  yield all([
    takeLatest(searchUser.type, userSearchWorker),
    //  takeLatest(signIn.type, signInWorker),
  ]);
}

export default headerSaga;
