import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ChatListType } from './types';

export const initialState: ChatListType = {
  loading: false,
  chatList: [],
  error: false,
  selectedUserChat: '',
};
const chatList = createSlice({
  name: 'chatList',
  initialState,
  reducers: {
    fetchUserChatList: (
      state: ChatListType,
      action: PayloadAction<{ value: boolean }>,
    ) => {
      state.loading = action.payload.value;
    },
    userChatListSuccessful: (
      state: ChatListType,
      action: PayloadAction<{ value: any[] }>,
    ) => {
      state.loading = false;
      state.chatList = action.payload.value;
    },
    userChatListFailed: (
      state: ChatListType,
      action: PayloadAction<{ value: boolean }>,
    ) => {
      state.loading = false;
      state.error = action.payload.value;
    },
  },
});

export const { fetchUserChatList, userChatListSuccessful, userChatListFailed } =
  chatList.actions;

export default chatList.reducer;
