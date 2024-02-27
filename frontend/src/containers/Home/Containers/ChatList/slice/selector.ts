import { createSelector } from 'reselect';

const selectChatListState = (state: any) => state.chat;

export const selectChatListLoading = createSelector(
  selectChatListState,
  (chat) => chat.loading,
);

export const selectChatListError = createSelector(
  selectChatListState,
  (chat) => chat.error,
);
export const selectSelectedChat = createSelector(
  selectChatListState,
  (chat) => chat.selectedUserChat,
);

export const selectChatList = createSelector(
  selectChatListState,
  (chat) => chat.chatList,
);
