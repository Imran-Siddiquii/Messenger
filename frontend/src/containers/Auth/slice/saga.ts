import { takeLatest, call, put, all } from 'redux-saga/effects';
import { login, loginFailure, loginSuccess, signIn, signInFailuer, signInSuccess } from './index'; // Assuming you have success and failure actions

// Your async login function, replace with your actual login API call
const apiLogin = async (credentials: any) => {
  console.log("🚀 ~ apiLogin ~ credentials:", credentials)
  // Perform your login API call here and return the result
  // Example: const response = await fetch('/api/login', { method: 'POST', body: credentials });
  // return response.json();
  return { user: { username: 'exampleUser' } }; // Dummy data for testing
};

// Saga worker function
function* loginWorker(action:any): Generator<any, void, any> {
  try {
    const result = yield call(apiLogin, action.payload); // Assuming payload contains login credentials
    console.log('🚀 ~ function*loginWorker ~ result:', result);
    yield put(loginSuccess(result));
  } catch (error) {
    yield put(loginFailure(error));
  }
}

// Saga worker function
function* signInWorker(action:any): Generator<any, void, any> {
  try {
    const result = yield call(apiLogin, action.payload); // Assuming payload contains login credentials
    console.log('🚀 ~ function*signInWorker ~ result:', result);
    yield put(signInSuccess(result));
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
