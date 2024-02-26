import { takeLatest, call, put, all } from 'redux-saga/effects';
import {
  login,
  loginFailure,
  loginSuccess,
  signIn,
  signInFailuer,
  signInSuccess,
} from './index'; // Assuming you have success and failure actions
import { apiRequest } from '../../../utils/apiRequest';

async function convertToJson(response: any) {
  return await response.json();
}
// Saga worker function
function* loginWorker(action: any): Generator<any, void, any> {
  try {
    const result = yield call(
      apiRequest,
      'POST',
      'login',
      action.payload.value,
    ); // Assuming payload contains login credentials
    const response = yield call(convertToJson, result);

    if (result.status === 200) {
      yield put(loginSuccess(response));
    } else {
      yield put(loginFailure(response));
    }
  } catch (error) {
    yield put(loginFailure(error));
  }
}

// Saga worker function
function* signInWorker(action: any): Generator<any, void, any> {
  try {
    const result = yield call(
      apiRequest,
      'POST',
      'signup',
      action.payload.value,
    );
    const response = yield call(convertToJson, result); // Assuming payload contains login credentials
    if (result.status === 200) {
      yield put(signInSuccess(response));
    } else {
      yield put(signInFailuer(response));
    }
  } catch (error) {
    yield put(signInFailuer(error));
  }
}

// Saga watcher function
function* authSaga() {
  yield all([
    takeLatest(login.type, loginWorker),
    takeLatest(signIn.type, signInWorker),
  ]);
}

export default authSaga;
