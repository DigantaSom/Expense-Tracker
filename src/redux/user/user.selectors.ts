import { createSelector } from 'reselect';

import { RootState } from '../store';

const selectUser = (state: RootState) => state.user;

export const selectCurrentUser = createSelector([selectUser], user => user.currentUser);
export const selectUserLoading = createSelector([selectUser], user => user.loading);
