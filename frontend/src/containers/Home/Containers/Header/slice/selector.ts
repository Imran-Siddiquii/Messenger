import { createSelector } from 'reselect';

const selectHeaderState = (state: any) => state.header;

export const selectSearchLoading = createSelector(
  selectHeaderState,
  (header) => header.loading,
);

export const selectSearchError = createSelector(
  selectHeaderState,
  (header) => header.error,
);
export const selectSearchValue = createSelector(
  selectHeaderState,
  (header) => header.searchValue,
);

export const selectSearchUserData = createSelector(
  selectHeaderState,
  (header) => header.data,
);
