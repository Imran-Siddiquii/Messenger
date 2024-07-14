import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { HeaderContainerType } from './types';

export const initialState: HeaderContainerType = {
  loading: false,
  data: [],
  error: false,
  searchValue: '',
  notification: [],
};
const HeaderContainer = createSlice({
  name: 'headerContainer',
  initialState,
  reducers: {
    searchUser: (
      state: HeaderContainerType,
      action: PayloadAction<{ value: string }>,
    ) => {
      state.searchValue = action.payload.value;
      state.loading = true;
    },
    searchUserSuccessful: (
      state: HeaderContainerType,
      action: PayloadAction<{ value: any[] }>,
    ) => {
      state.loading = false;
      state.data = action.payload.value;
    },
    searchUserEmpty: (
      state: HeaderContainerType,
      action: PayloadAction<string>,
    ) => {
      state.searchValue = action.payload;
    },
    searchUserFailed: (
      state: HeaderContainerType,
      action: PayloadAction<{ value: boolean }>,
    ) => {
      state.loading = false;
      state.error = action.payload.value;
    },
    setNotification: (
      state: HeaderContainerType,
      action: PayloadAction<{ newNotification: any }>,
    ) => {
      state.notification = action.payload.newNotification;
    },
  },
});

export const {
  searchUser,
  searchUserSuccessful,
  searchUserFailed,
  searchUserEmpty,
  setNotification,
} = HeaderContainer.actions;

export default HeaderContainer.reducer;
