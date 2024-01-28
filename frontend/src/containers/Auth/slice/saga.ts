import { takeLatest, call, put, all } from 'redux-saga/effects';
import {
  login,
  loginFailure,
  loginSuccess,
  signIn,
  signInFailuer,
  signInSuccess,
} from './index'; // Assuming you have success and failure actions

// Your async login function, replace with your actual login API call

const apiRequest = async (credentials: any, request: string) => {
  // Perform your login API call here and return the result
  const response = await fetch(`http://localhost:3000/api/v1/${request}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials.payload),
  });
  return response;
};

async function convertToJson(response: any) {
  return await response.json();
}
// Saga worker function
function* loginWorker(action: any): Generator<any, void, any> {
  try {
    const result = yield call(apiRequest, action.payload, 'login'); // Assuming payload contains login credentials
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
    const result = yield call(apiRequest, action.payload, 'signup');
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
