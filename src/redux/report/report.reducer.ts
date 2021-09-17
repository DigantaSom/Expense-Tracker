import { MonthType, ItemFieldType } from '../../types';
import {
  ReportActionType,
  IReportItem,
  IReportRef,
  FETCH_EXPENSE_REPORT_START,
  FETCH_EXPENSE_REPORT_SUCCESS,
  FETCH_EXPENSE_REPORT_FAILURE,
  FETCH_REPORT_REFS_BY_YEAR_START,
  FETCH_REPORT_REFS_BY_YEAR_SUCCESS,
  FETCH_REPORT_REFS_BY_YEAR_FAILURE,
  SET_SELECTED_MONTH,
  ADD_REPORT_ITEM_START,
  ADD_REPORT_ITEM_SUCCESS,
  ADD_REPORT_ITEM_FAILURE,
  EDIT_REPORT_ITEM_START,
  EDIT_REPORT_ITEM_SUCCESS,
  EDIT_REPORT_ITEM_SUCCESS_DIFFERENT_MONTH_OR_YEAR,
  EDIT_REPORT_ITEM_FAILURE,
  DELETE_REPORT_ITEM_START,
  DELETE_REPORT_ITEM_SUCCESS,
  DELETE_REPORT_ITEM_FAILURE,
  CLEAR_REPORT,
} from './report.types';

interface IDefaultState {
  report: IReportItem[];
  reportRefs: IReportRef & { selectedMonth: MonthType };
  loading: boolean;
  actionLoading: {
    loading: boolean;
    id: string;
    field: ItemFieldType;
  };
  error: string;
}

const defaultState: IDefaultState = {
  report: [],
  reportRefs: {
    year: '',
    months: [],
    selectedMonth: '',
  },
  loading: false,
  actionLoading: {
    loading: false,
    id: '',
    field: '',
  },
  error: '',
};

const reportReducer = (
  state: IDefaultState = defaultState,
  action: ReportActionType,
): IDefaultState => {
  switch (action.type) {
    // Fetch all items of an Expense Report by year and month together
    case FETCH_EXPENSE_REPORT_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_EXPENSE_REPORT_SUCCESS:
      return {
        ...state,
        report: action.payload,
        loading: false,
        actionLoading: {
          ...state.actionLoading,
          loading: false,
          id: '',
          field: '',
        },
        error: '',
      };
    case FETCH_EXPENSE_REPORT_FAILURE:
      return {
        ...state,
        report: [],
        loading: false,
        actionLoading: {
          ...state.actionLoading,
          loading: false,
          id: '',
          field: '',
        },
        error: action.payload,
      };

    // Fetch expense report refs by their Year
    case FETCH_REPORT_REFS_BY_YEAR_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_REPORT_REFS_BY_YEAR_SUCCESS:
      return {
        ...state,
        report: [],
        reportRefs: { ...action.payload, selectedMonth: '' },
        loading: false,
        error: '',
      };
    case FETCH_REPORT_REFS_BY_YEAR_FAILURE:
      return {
        ...state,
        loading: false,
        reportRefs: {
          ...state.reportRefs,
          year: '',
          months: [],
          selectedMonth: '',
        },
        error: action.payload,
      };

    // Set selected month in redux
    case SET_SELECTED_MONTH:
      return {
        ...state,
        reportRefs: {
          ...state.reportRefs,
          selectedMonth: action.payload,
        },
      };

    // Add a new report item
    case ADD_REPORT_ITEM_START:
      return {
        ...state,
        loading: true,
      };
    case ADD_REPORT_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
      };
    case ADD_REPORT_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Edit an existing report item
    case EDIT_REPORT_ITEM_START:
      return {
        ...state,
        actionLoading: {
          ...state.actionLoading,
          loading: true,
          ...action.payload,
        },
      };
    case EDIT_REPORT_ITEM_SUCCESS:
      return {
        ...state,
        report: state.report.map(item =>
          item.id === action.payload.id ? action.payload : item,
        ),
        actionLoading: {
          ...state.actionLoading,
          loading: false,
          id: '',
          field: '',
        },
        error: '',
      };
    case EDIT_REPORT_ITEM_SUCCESS_DIFFERENT_MONTH_OR_YEAR:
      return {
        ...state,
        report: state.report.filter(item => item.id !== action.payload.reportId),
        actionLoading: {
          ...state.actionLoading,
          loading: false,
          id: '',
          field: '',
        },
        error: '',
      };
    case EDIT_REPORT_ITEM_FAILURE:
      return {
        ...state,
        actionLoading: {
          ...state.actionLoading,
          loading: false,
          id: '',
          field: '',
        },
        error: action.payload,
      };

    // Delete a report item
    case DELETE_REPORT_ITEM_START:
      return {
        ...state,
        actionLoading: {
          ...state.actionLoading,
          loading: true,
          id: action.payload.reportId,
          field: '',
        },
      };
    case DELETE_REPORT_ITEM_SUCCESS:
      return {
        ...state,
        report: state.report.filter(item => item.id !== action.payload.reportId),
        actionLoading: {
          ...state.actionLoading,
          loading: false,
          id: '',
          field: '',
        },
        error: '',
      };
    case DELETE_REPORT_ITEM_FAILURE:
      return {
        ...state,
        actionLoading: {
          ...state.actionLoading,
          loading: false,
          id: '',
          field: '',
        },
        error: action.payload,
      };

    // Clear Report state
    case CLEAR_REPORT:
      return defaultState;

    default:
      return state;
  }
};

export default reportReducer;
