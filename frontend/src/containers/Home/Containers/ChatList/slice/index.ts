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
    accessChat: (
      state: ChatListType,
      action: PayloadAction<{ userId: string }>,
    ) => {
      state.loading = true;
      state.selectedUserChat = action.payload.userId;
    },
    accessChatSuccessful: (
      state: ChatListType,
      action: PayloadAction<{ value: any }>,
    ) => {
    state.loading = false;
    const existingIndex = state.chatList.findIndex(
      (user) => user._id === action.payload.value._id,
    );

    if (existingIndex !== -1) {
      // Remove the existing user
      state.chatList.splice(existingIndex, 1);
    }

    // Add the user to the beginning of the list
    state.chatList = [action.payload.value, ...state.chatList];
    },
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

export const {
  fetchUserChatList,
  userChatListSuccessful,
  userChatListFailed,
  accessChat,
  accessChatSuccessful,
} = chatList.actions;

export default chatList.reducer;
