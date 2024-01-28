import { createSelector } from 'reselect';

const selectAuthState = (state: any) => state.auth;

export const selectLoading = createSelector(
  selectAuthState,
  (auth) => auth.loading,
);

export const selectError = createSelector(
  selectAuthState,
  (auth) => auth.error,
);

export const selectUserToken = createSelector(selectAuthState, (auth) => auth.token);
export const selectUser = createSelector(selectAuthState, (auth) => auth.user);

export const selectMessage = createSelector(
  selectAuthState,
  (auth) => auth.message,
);
