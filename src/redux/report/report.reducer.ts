import { ItemFieldType } from '../../types';
import {
  ReportActionType,
  IReportItem,
  FETCH_EXPENSE_REPORT_START,
  FETCH_EXPENSE_REPORT_SUCCESS,
  FETCH_EXPENSE_REPORT_FAILURE,
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
        error: '',
      };
    case FETCH_EXPENSE_REPORT_FAILURE:
      return {
        ...state,
        report: [],
        loading: false,
        error: action.payload,
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
