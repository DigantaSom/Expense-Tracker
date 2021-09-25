import { createSelector } from 'reselect';

import { RootState } from '../store';

const selectReportState = (state: RootState) => state.report;

export const selectReport = createSelector([selectReportState], report => report.report);
export const selectReportRefs = createSelector(
  [selectReportState],
  report => report.reportRefs,
);
export const selectReportLoading = createSelector(
  [selectReportState],
  report => report.loading,
);
export const selectReportActionLoading = createSelector(
  [selectReportState],
  report => report.actionLoading,
);
export const selectReportError = createSelector(
  [selectReportState],
  report => report.error,
);

export const selectTotalReportCost = createSelector([selectReport], report =>
  report.reduce((accumulatedCost, reportItem) => accumulatedCost + reportItem.cost, 0),
);
