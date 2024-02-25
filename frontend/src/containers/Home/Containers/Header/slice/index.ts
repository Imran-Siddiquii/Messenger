import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { HeaderContainerType } from './types';

export const initialState: HeaderContainerType = {
  loading: false,
  data: [],
  error: false,
  searchValue: '',
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
    searchUserFailed: (
      state: HeaderContainerType,
      action: PayloadAction<{ value: boolean }>,
    ) => {
      state.loading = false;
      state.error = action.payload.value;
    },
  },
});

export const { searchUser, searchUserSuccessful, searchUserFailed } =
  HeaderContainer.actions;

export default HeaderContainer.reducer;
