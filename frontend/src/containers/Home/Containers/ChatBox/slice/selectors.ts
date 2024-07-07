import { createSelector } from '@reduxjs/toolkit';

const selectAuthState = (state: any) => state.chatBox;

export const selectChatboxLoading = createSelector(
  selectAuthState,
  (chatBox) => chatBox.loading,
);

export const selectChatboxError = createSelector(
  selectAuthState,
  (chatBox) => chatBox.error,
);

export const selectChatboxMessage = createSelector(
  selectAuthState,
  (chatBox) => chatBox.message,
);

export const selectChatboxData = createSelector(
  selectAuthState,
  (chatBox) => chatBox.Data,
);