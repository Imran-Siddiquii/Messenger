import { ChatBoxStateType } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ChatBoxStateType = {
  loading: false,
  message: '',
  error: false,
  data: [],
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
        data: state.data,
      };
      return state;
    },
    groupRenameSuccess: (state: ChatBoxStateType) => {
      state = {
        loading: false,
        error: false,
        message: 'Group name has been updated.',
        data: state.data,
      };
      return state;
    },
    groupRenameError: (state: ChatBoxStateType) => {
      state = {
        loading: false,
        error: true,
        message: 'Please try again!',
        data: state.data,
      };
      return state;
    },
    groupDeleteInitail: (state: ChatBoxStateType) => {
      state = {
        loading: true,
        error: false,
        message: '',
        data: state.data,
      };
      return state;
    },
    groupDeleteSuccess: (state: ChatBoxStateType) => {
      state = {
        loading: false,
        error: false,
        message: 'Group name has been Deleted.',
        data: state.data,
      };
      return state;
    },
    groupDeleteError: (state: ChatBoxStateType) => {
      state = {
        loading: false,
        error: true,
        message: 'Please try again!',
        data: state.data,
      };
      return state;
    },
    fetchMessages: (state: ChatBoxStateType) => {
      state = {
        ...state,
        loading: true,
        error: false,
      };
      return state;
    },
    fetchMessagesSuccess: (
      state: ChatBoxStateType,
      action: PayloadAction<{ data: [] }>,
    ) => {
      state = {
        loading: false,
        error: false,
        message: '',
        data: action.payload.data,
      };
      return state;
    },
    fetchMessagesError: (state: ChatBoxStateType) => {
      state = {
        loading: false,
        error: true,
        message: 'Please try again!',
        data: state.data,
      };
      return state;
    },

    sendMessage: (
      state: ChatBoxStateType,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _action: PayloadAction<{ text: string }>,
    ) => {
      state = {
        ...state,
        loading: true,
        error: false,
      };
      return state;
    },
    sendMessageSuccess: (
      state: ChatBoxStateType,
      action: PayloadAction<{ data: any }>,
    ) => {
      state = {
        loading: false,
        error: false,
        message: '',
        data: [...state.data, action.payload.data],
      };
      return state;
    },
    sendMessageError: (state: ChatBoxStateType) => {
      state = {
        loading: false,
        error: true,
        message: 'Please try again!',
        data: state.data,
      };
      return state;
    },
    addNewMessage: (
      state: ChatBoxStateType,
      action: PayloadAction<{ newMessage: any[] }>,
    ) => {
      state.data = action.payload.newMessage;
    },
  },
});

export const {
  groupRenameInitail,
  groupRenameSuccess,
  groupRenameError,
  groupDeleteInitail,
  groupDeleteSuccess,
  groupDeleteError,
  fetchMessages,
  fetchMessagesSuccess,
  fetchMessagesError,
  sendMessage,
  sendMessageSuccess,
  sendMessageError,
  addNewMessage,
} = ChatboxSlice.actions;
export default ChatboxSlice.reducer;
