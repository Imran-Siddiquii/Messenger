import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthInitialState, LoginAction, SignInAction } from '../types';
import { saveToken, saveUser } from '../../../utils';

const initialState: AuthInitialState = {
  loading: false,
  error: false,
  user: {},
  token: '',
  message: '',
};

const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    login: (
      state: AuthInitialState,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _action: PayloadAction<LoginAction>,
    ): void => {
      state.loading = true;
      state.message = '';
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    signIn: (state: AuthInitialState, _action: PayloadAction<SignInAction>) => {
      state.loading = true;
      state.message = '';
    },
    loginSuccess: (state: AuthInitialState, action) => {
      saveToken(action.payload.access_token);
      saveUser(action.payload.user);
      state = {
        loading: false,
        error: false,
        message: action.payload.message,
        user: action.payload.user,
        token: action.payload.access_token,
      };
      return state;
    },
    loginFailure: (state, action) => {
      state = {
        ...state,
        loading: false,
        error: false,
        message: action.payload.message,
      };
      return state;
    },
    signInSuccess: (state: AuthInitialState, action) => {
      saveToken(action.payload.access_token);
      saveUser(action.payload.user);
      state = {
        loading: false,
        error: false,
        message: action.payload.message,
        user: action.payload.user,
        token: action.payload.access_token,
      };
      return state;
    },
    signInFailuer: (state: AuthInitialState, action) => {
      state = {
        ...state,
        loading: false,
        error: false,
        message: action.payload.message,
      };
    },
  },
});

export const {
  login,
  signIn,
  loginSuccess,
  loginFailure,
  signInFailuer,
  signInSuccess,
} = AuthSlice.actions;
export default AuthSlice.reducer;
