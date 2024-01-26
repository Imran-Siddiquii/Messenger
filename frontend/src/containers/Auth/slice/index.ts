import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthInitialState, LoginAction, SignInAction } from '../types';

const initialState: AuthInitialState = {
  loading: false,
  error: false,
  user: {},
  message: '',
};

const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    login: (_: AuthInitialState, action: PayloadAction<LoginAction>): void => {
      console.log(action, 'akkfnadjns');
    },
    signIn: (_: AuthInitialState, action: PayloadAction<SignInAction>) => {
      console.log('🚀 ~ action:', action);
    },
    loginSuccess: (state: AuthInitialState, action) => {
      console.log('🚀 ~ state:', state);
      console.log('🚀 ~ action:', action);
    },
    loginFailure: (state, action) => {
      console.log('🚀 ~ state:', state);
      console.log('🚀 ~ action:', action);
    },
    signInSuccess: (state: AuthInitialState, action) => {
      console.log('🚀 ~ state:', state);
      console.log(action, 'chekckk');
    },
    signInFailuer: (state: AuthInitialState, action) => {
      console.log('🚀 ~ state:', state);
      console.log(action, 'chekckk');
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
