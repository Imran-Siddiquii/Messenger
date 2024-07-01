import { ChatBoxStateType } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ChatBoxStateType = {
  loading: false,
  message: '',
  error: false,
};
const ChatboxSlice = createSlice({
  name: 'chat-box',
  initialState,
  reducers: {
    groupRenameInitail: (
      state: ChatBoxStateType,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _action: PayloadAction<{
        groupDetails: { groupId: string; chatName: string };
      }>,
    ) => {
      state = {
        loading: true,
        error: false,
        message: '',
      };
      return state;
    },
    groupRenameSuccess: (state: ChatBoxStateType) => {
      state = {
        loading: false,
        error: false,
        message: 'Group name has been updated.',
      };
      return state;
    },
    groupRenameError: (state: ChatBoxStateType) => {
      state = {
        loading: false,
        error: true,
        message: 'Please try again!',
      };
      return state;
    },
  },
});

export const { groupRenameInitail, groupRenameSuccess, groupRenameError } =
  ChatboxSlice.actions;
export default ChatboxSlice.reducer;
