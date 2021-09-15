import { MonthType, ItemFieldType } from '../../types';

export const FETCH_EXPENSE_REPORT_START = 'FETCH_EXPENSE_REPORT_START';
export const FETCH_EXPENSE_REPORT_SUCCESS = 'FETCH_EXPENSE_REPORT_SUCCESS';
export const FETCH_EXPENSE_REPORT_FAILURE = 'FETCH_EXPENSE_REPORT_FAILURE';

export const FETCH_REPORT_REFS_BY_YEAR_START = 'FETCH_REPORT_REFS_BY_YEAR_START';
export const FETCH_REPORT_REFS_BY_YEAR_SUCCESS = 'FETCH_REPORT_REFS_BY_YEAR_SUCCESS';
export const FETCH_REPORT_REFS_BY_YEAR_FAILURE = 'FETCH_REPORT_REFS_BY_YEAR_FAILURE';

export const SET_SELECTED_MONTH = 'SET_SELECTED_MONTH';

export const ADD_REPORT_ITEM_START = 'ADD_REPORT_ITEM_START';
export const ADD_REPORT_ITEM_SUCCESS = 'ADD_REPORT_ITEM_SUCCESS';
export const ADD_REPORT_ITEM_FAILURE = 'ADD_REPORT_ITEM_FAILURE';

export const EDIT_REPORT_ITEM_START = 'EDIT_REPORT_ITEM_START';
export const EDIT_REPORT_ITEM_SUCCESS = 'EDIT_REPORT_ITEM_SUCCESS';
export const EDIT_REPORT_ITEM_SUCCESS_DIFFERENT_MONTH_OR_YEAR =
  'EDIT_REPORT_ITEM_SUCCESS_DIFFERENT_MONTH_OR_YEAR';
export const EDIT_REPORT_ITEM_FAILURE = 'EDIT_REPORT_ITEM_FAILURE';

export const DELETE_REPORT_ITEM_START = 'DELETE_REPORT_ITEM_START';
export const DELETE_REPORT_ITEM_SUCCESS = 'DELETE_REPORT_ITEM_SUCCESS';
export const DELETE_REPORT_ITEM_FAILURE = 'DELETE_REPORT_ITEM_FAILURE';

export const CLEAR_REPORT = 'CLEAR_REPORT';

export interface IReportItem {
  id?: string;
  item: string;
  description?: string;
  recipient: string;
  cost: number;
  medium: string;
  date: string;
}
export interface IReportRef {
  year: string;
  months: MonthType[];
}

// Fetch all items of an Expense Report by year and month together
export interface IFetchExpenseReportStart {
  type: typeof FETCH_EXPENSE_REPORT_START;
}
export interface IFetchExpenseReportSuccess {
  type: typeof FETCH_EXPENSE_REPORT_SUCCESS;
  payload: IReportItem[];
}
export interface IFetchExpenseReportFailure {
  type: typeof FETCH_EXPENSE_REPORT_FAILURE;
  payload: string;
}
export type FetchExpenseReportDispatchType =
  | IFetchExpenseReportStart
  | IFetchExpenseReportSuccess
  | IFetchExpenseReportFailure;

// Fetch expense report refs by their Year
export interface IFetchReportRefsByYearStart {
  type: typeof FETCH_REPORT_REFS_BY_YEAR_START;
}
export interface IFetchReportRefsByYearSuccess {
  type: typeof FETCH_REPORT_REFS_BY_YEAR_SUCCESS;
  payload: IReportRef;
}
export interface IFetchReportRefsByYearFailure {
  type: typeof FETCH_REPORT_REFS_BY_YEAR_FAILURE;
  payload: string;
}
export type FetchReportRefsByYearDispatchType =
  | IFetchReportRefsByYearStart
  | IFetchReportRefsByYearSuccess
  | IFetchReportRefsByYearFailure;

// Set selected month in redux
export interface ISetSelectedMonth {
  type: typeof SET_SELECTED_MONTH;
  payload: MonthType;
}

// Add a report item
export interface IAddReportItemStart {
  type: typeof ADD_REPORT_ITEM_START;
}
export interface IAddReportItemSuccess {
  type: typeof ADD_REPORT_ITEM_SUCCESS;
}
export interface IAddReportItemFailure {
  type: typeof ADD_REPORT_ITEM_FAILURE;
  payload: string;
}
export type AddReportItemDispatchType =
  | IAddReportItemStart
  | IAddReportItemSuccess
  | IAddReportItemFailure;

// Edit an existing report item
export interface IEditReportItemStart {
  type: typeof EDIT_REPORT_ITEM_START;
  payload: {
    id: string;
    field: ItemFieldType;
  };
}
export interface IEditReportItemSuccess {
  type: typeof EDIT_REPORT_ITEM_SUCCESS;
  payload: IReportItem;
}
export interface IEditReportItemSuccess_differentMonthOrYear {
  type: typeof EDIT_REPORT_ITEM_SUCCESS_DIFFERENT_MONTH_OR_YEAR;
  payload: {
    reportId: string;
  };
}
export interface IEditReportItemFailure {
  type: typeof EDIT_REPORT_ITEM_FAILURE;
  payload: string;
}
export type EditReportItemDispatchType =
  | IEditReportItemStart
  | IEditReportItemSuccess
  | IEditReportItemSuccess_differentMonthOrYear
  | IEditReportItemFailure;

// Delete a report item
export interface IDeleteReportItemStart {
  type: typeof DELETE_REPORT_ITEM_START;
  payload: {
    reportId: string;
  };
}
export interface IDeleteReportItemSuccess {
  type: typeof DELETE_REPORT_ITEM_SUCCESS;
  payload: {
    reportId: string;
  };
}
export interface IDeleteReportItemFailure {
  type: typeof DELETE_REPORT_ITEM_FAILURE;
  payload: string;
}
export type DeleteReportItemDispatchType =
  | IDeleteReportItemStart
  | IDeleteReportItemSuccess
  | IDeleteReportItemFailure;

// Clear Report state
export interface IClearReport {
  type: typeof CLEAR_REPORT;
}

// Report Action Type
export type ReportActionType =
  | FetchExpenseReportDispatchType
  | FetchReportRefsByYearDispatchType
  | ISetSelectedMonth
  | AddReportItemDispatchType
  | EditReportItemDispatchType
  | DeleteReportItemDispatchType
  | IClearReport;
