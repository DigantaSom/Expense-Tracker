import { ItemFieldType } from '../../types';

export const FETCH_EXPENSE_REPORT_START = 'FETCH_EXPENSE_REPORT_START';
export const FETCH_EXPENSE_REPORT_SUCCESS = 'FETCH_EXPENSE_REPORT_SUCCESS';
export const FETCH_EXPENSE_REPORT_FAILURE = 'FETCH_EXPENSE_REPORT_FAILURE';

export const ADD_REPORT_ITEM_START = 'ADD_REPORT_ITEM_START';
export const ADD_REPORT_ITEM_SUCCESS = 'ADD_REPORT_ITEM_SUCCESS';
export const ADD_REPORT_ITEM_FAILURE = 'ADD_REPORT_ITEM_FAILURE';

export const EDIT_REPORT_ITEM_START = 'EDIT_REPORT_ITEM_START';
export const EDIT_REPORT_ITEM_SUCCESS = 'EDIT_REPORT_ITEM_SUCCESS';
export const EDIT_REPORT_ITEM_SUCCESS_DIFFERENT_MONTH_OR_YEAR =
  'EDIT_REPORT_ITEM_SUCCESS_DIFFERENT_MONTH_OR_YEAR';
export const EDIT_REPORT_ITEM_FAILURE = 'EDIT_REPORT_ITEM_FAILURE';

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

// Clear Report state
export interface IClearReport {
  type: typeof CLEAR_REPORT;
}

// Report Action Type
export type ReportActionType =
  | FetchExpenseReportDispatchType
  | AddReportItemDispatchType
  | EditReportItemDispatchType
  | IClearReport;
